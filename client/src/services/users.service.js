import GenericService from './generic.service';
import authHeader from './auth-header';
import * as tf from '@tensorflow/tfjs';

const MODEL_API = "http://localhost:3000/model.json";

class UserService {
  getPublicContent() {
    const content = GenericService.request({
      url: 'users',
      method: 'get',
      data: {},
      headers: authHeader(),
    });
    return content;
  }

  getUserBoard() {
    const content = GenericService.request({
      url: `user/${id}`,
      method: 'get',
      data: {},
      headers: authHeader(),
    });
    return content;
  }

  getAdminBoard() {
    const content = GenericService.request({
      url: `user/${id}`,
      method: 'get',
      data: {},
      headers: authHeader()
    });
    return content;
  }

  async generateLogo() {

    // Load model
    const model =  await tf.loadLayersModel(MODEL_API);

    // Generate random input points
    const latent_points = tf.randomNormal([1, 100]);

    // Make prediction
    const result = model.predict(latent_points).squeeze().mul(tf.scalar(127)).add(tf.scalar(127)).asType('int32');


    const size = result.shape[0];
    const draw_multiplier = 2;
    return result.expandDims(2).tile([1, 1, draw_multiplier, 1]).reshape([size, size * draw_multiplier, 3]).expandDims(1).tile([1, draw_multiplier, 1, 1]).reshape([size * draw_multiplier, size * draw_multiplier, 3]);

    //const canvas = document.createElement('canvas');
    //canvas.width = y.shape.width
    //canvas.height = y.shape.height

    //tf.browser.toPixels(y, canvas);
    return result

    //const y = tf.tidy(() => {
      
      //.transpose([1, 2, 0]).div(tf.scalar(2)).add(tf.scalar(0.5))

      
      
      
      //const values = y.arraySync();
      //console.log(values);
      //const arr = new Uint8ClampedArray.from(y);

      //document.getElementById("the_canvas").getContext("2d").putImageData(new ImageData(Uint8ClampedArray.from(y), 32, 32), 1, 1);
      //image = new ImageData(Uint8ClampedArray.from(y), 32, 32)
      //console.log(Image);
      //return tf.browser.toPixels(y, canvas);
    //});

    /*
    
    const model =  await tf.loadLayersModel("http://localhost:3000/model.json");
    if (!model) {
      throw new Error("Load generator error");
    }

    const arr = []
    for (let i = 0; i < 100; i += 1) {
      arr.push(Math.random() * (2 + 1) + -1)
    }
    const new_arr = [arr]

    const tensor = tf.tensor(new_arr);

    const logo = model.predict(tensor)

    // Generate latent points
    console.log(logo);
    */

  }

  async uploadFile(file, id) {

    // Create an Form Data object
    const formData = new FormData();
    formData.append("file", file);

    const updatedUser = await GenericService.upload({
      url: `users/upload/${id}`,
      method: "post",
      files: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });

    // Refresh user information
    if (updatedUser.data.updatedUser) {
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(updatedUser.data.updatedUser));
    }

    // If all ok return
    return updatedUser.data;
  }

  async updateUsername(newUsername, id) {
    const updatedUser = await GenericService.request({
      url: `users/updateUsername/${id}`,
      method: 'patch',
      data: {
        newUsername: newUsername,
      }
    });

    // Refresh user information
    if (updatedUser.data.updatedUser) {
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(updatedUser.data.updatedUser));
    }

    // If all ok return
    return updatedUser.data;
  }

  async updatePassword(oldPassword, newPassword, id) {
    const updatedUser = await GenericService.request({
      url: `users/updatePassword/${id}`,
      method: 'patch',
      data: {
        oldPassword: oldPassword,
        newPassword: newPassword
      }
    });

    // Refresh user information
    if (updatedUser.data.updatedUser) {
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(updatedUser.data.updatedUser));
    }

    // If all ok return
    return updatedUser.data;
  }

  async updateEmail(newEmail, id) {
    const updatedUser = await GenericService.request({
      url: `users/updateEmail/${id}`,
      method: 'patch',
      data: {
        newEmail: newEmail,
      }
    });

    // Refresh user information
    if (updatedUser.data.updatedUser) {
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(updatedUser.data.updatedUser));
    }

    // If all ok return
    return updatedUser.data;
  }

}

export default new UserService();