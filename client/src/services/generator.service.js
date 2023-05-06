import * as tf from '@tensorflow/tfjs';

const MODEL_API = "https://us-central1-logogenerator-730da.cloudfunctions.net/app/model.json";

class GeneratorService {

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

}

export default new GeneratorService();