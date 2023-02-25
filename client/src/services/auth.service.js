import GenericService from './generic.service';

class AuthService {

  async register(user) {
    const candidate = await GenericService.request({
      url: 'auth/register',
      method: 'post',
      data: {
        username: user.username,
        password: user.password,
        email: user.email
      }
    });

    // If all ok return
    return candidate;
  }

  async login(user) {

    // Try to login
    const candidate = await GenericService.request({
      url: 'auth/login',
      method: 'post',
      data: {
        username: user.username,
        password: user.password
      }
    });

    console.log(candidate);
    // Add data to localStorage
    if (candidate.data.user.accessToken) {
      localStorage.setItem("user", JSON.stringify(candidate.data.user.existingUser));
      localStorage.setItem("accesToken", JSON.stringify(candidate.data.user.accessToken));
    }

    // If all ok return user data
    return candidate.data.user.existingUser;
  }

  async logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("accesToken");
  }
  
}

export default new AuthService();