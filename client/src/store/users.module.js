import UsersService from "../services/users.service";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

export const users = {
  namespaced: true,
  actions: {
    updateUsername({}, newUsername) {
      return UsersService.updateUsername(newUsername, user._id).then(
        response => {
          console.log(response);
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