import * as tf from '@tensorflow/tfjs';
import {v4 as uuidv4} from 'uuid';
import GenericService from './generic.service';
import {storage, uploadBytes, ref, getDownloadURL, deleteObject} from '../firebase/init';


//const MODEL_API = "https://us-central1-logogenerator-730da.cloudfunctions.net/app/model.json";
const MODEL_API = "http://localhost:3000/model.json";

class LogosService {

  async getUserLogos(id) {
    const content = GenericService.request({
      url: `users/${id}/logos`,
      method: 'get',
      data: {},
    });
    return content;
  }

  async generateLogo() {

    // Load model
    const model =  await tf.loadLayersModel(MODEL_API);
    if (!model) {
      throw new Error("Load generator error");
    }

    // Generate random input points
    const latent_points = tf.randomNormal([1, 100]);

    // Make prediction
    const result = model.predict(latent_points).squeeze().mul(tf.scalar(127)).add(tf.scalar(127)).asType('int32');


    const size = result.shape[0];

    // Multiplicate the output image
    const draw_multiplier = 2;
    return result.expandDims(2).tile([1, 1, draw_multiplier, 1]).reshape([size, size * draw_multiplier, 3]).expandDims(1).tile([1, draw_multiplier, 1, 1]).reshape([size * draw_multiplier, size * draw_multiplier, 3]);
  }

  async saveLogo(file, id) {

    // Points to the root reference
    const storageRef = ref(storage);
    
    // Points to 'logos'
    const logosRef = ref(storageRef, 'logos');

    // Generate a unique name for logo
    const logoName = `logo_${uuidv4()}.png`;
    const spaceRef = ref(logosRef, logoName);

    const uploadedLogo = await uploadBytes(spaceRef, file).then((snapshot) => {});

    const logoSize = String(file.size / 1000);
    const PathRef = ref(storage, "logos/" + logoName);
    const logoUrl = await getDownloadURL(PathRef);
    
    const savedLogo = await GenericService.request({
      url: 'logos/saveLogo',
      method: 'post',
      data: {
        name: logoName,
        size: logoSize,
        path: logoUrl,
        userId: id,
      }
    });

    // If all ok return
    return savedLogo.data;
  }

  async deleteLogo(id, logo) {
    
    const deletedLogo = await GenericService.request({
      url: `logos/deleteLogo/${id}`,
      method: 'delete',
      data: {},
    });

    // Create a reference to the file to delete
    const logoRef = ref(storage, `logos/${logo}`);

    // Delete the file
    await deleteObject(logoRef).then(() => {
      // File deleted successfully
    }).catch((error) => {
      throw new Error("Firebase delete error");
    });

    // If all ok return
    return deletedLogo.data;
  }

}

export default new LogosService();