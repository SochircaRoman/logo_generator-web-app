import GenericService from './generic.service';
import authHeader from './auth-header';
import {storage, uploadBytes, ref, getDownloadURL} from '../firebase/init';

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

  async uploadFile(file, id) {

    // Points to the root reference
    const storageRef = ref(storage);
    
    // Points to 'avatars'
    const imagesRef = ref(storageRef, 'avatars');

    // Create a unique file name using id
    const imageName = `user_${id}.jpg`;
    const spaceRef = ref(imagesRef, imageName);

    uploadBytes(spaceRef, file).then((snapshot) => {});

    const PathRef = ref(storage, "avatars/" + imageName);
    const newPath = await getDownloadURL(PathRef);
    
    const updatedUser = await GenericService.request({
      url: `users/updateProfilePic/${id}`,
      method: 'patch',
      data: {
        newPath: newPath,
      }
    });

    // Refresh user information
    if (updatedUser.data.updatedUser) {
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(updatedUser.data.updatedUser));
    }

    /*
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
    */

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