import axios from "axios";

const API_URL = "https://us-central1-logogenerator-730da.cloudfunctions.net/app/api";

class GenericService {
  async request({ url, method, data, headers }) {
    const response = await axios[method](`${API_URL}/${url}`, { data }, { headers });
    return response;
  }
  async upload({ url, method, files, headers }) {
    const response = await axios[method](`${API_URL}/${url}`, files, { headers });
    return response;
  }
}

export default new GenericService();