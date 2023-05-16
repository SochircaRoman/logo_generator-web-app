import UsersService from "../services/users.service";
import GeneratorService from "../services/generator.service";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

export const users = {
  namespaced: true,
  actions: {
    generateLogo({}) {
      return GeneratorService.generateLogo().then(
        response => {
          return Promise.resolve(response)
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    uploadFile({}, data) {
      return UsersService.uploadFile(data.file, data.id).then(
        response => {
          return Promise.resolve(response)
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    saveLogo({}, data) {
      return UsersService.saveLogo(data.file, data.id).then(
        response => {
          return Promise.resolve(response)
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    getUserLogos({}, data) {
      return UsersService.getUserLogos(data.id).then(
        response => {
          return Promise.resolve(response)
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    updateUsername({}, data) {
      return UsersService.updateUsername(data.newUsername, data.id).then(
        response => {
          return Promise.resolve(response)
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    updatePassword({}, data) {
      return UsersService.updatePassword(data.oldPassword, data.newPassword, data.id).then(
        response => {
          return Promise.resolve(response)
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    updateEmail({}, data) {
      return UsersService.updateEmail(data.newEmail, data.id).then(
        response => {
          return Promise.resolve(response)
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    updateSuccess(state) {
      state.status.loggedIn = false;
    },
    updateFailure(state) {
      state.status.loggedIn = false;
    }
  }
};