import GenericService from './generic.service';
import authHeader from './auth-header';

class UserService {
  getPublicContent() {
    const content = GenericService.request({
      url: 'users',
      method: 'get',
      headers: authHeader(),
      data: {},
    });
    return content;
  }

  getUserBoard() {
    const content = GenericService.request({
      url: `user/${id}`,
      method: 'get',
      headers: authHeader(),
      data: {},
    });
    return content;
  }

  getAdminBoard() {
    const content = GenericService.request({
      url: `user/${id}`,
      method: 'get',
      headers: authHeader(),
      data: {}
    });
    return content;
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

}

export default new UserService();