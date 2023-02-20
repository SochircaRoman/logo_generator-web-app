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
    console.log(content);
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
}

export default new UserService();