import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL

class GenericService {
  async request({ url, method, data = {}, headers = {}}) {
    const response = await axios[method](`${API_URL}/${url}`, { headers: headers, data: data });
    return response;
  }
}

export default new GenericService();