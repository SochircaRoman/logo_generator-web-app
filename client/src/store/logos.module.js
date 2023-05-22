import LogosService from "../services/logos.service";

export const logos = {
  namespaced: true,
  actions: {
    generateLogo({}) {
      return LogosService.generateLogo().then(
        response => {
          return Promise.resolve(response)
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    saveLogo({}, data) {
      return LogosService.saveLogo(data.file, data.id).then(
        response => {
          return Promise.resolve(response)
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    deleteLogo({}, data) {
      return LogosService.saveLogo(data.id).then(
        response => {
          return Promise.resolve(response)
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    getUserLogos({}, data) {
      return LogosService.getUserLogos(data.id).then(
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
    
  }
};