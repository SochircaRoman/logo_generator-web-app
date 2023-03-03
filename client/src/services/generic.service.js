import axios from "axios";

const API_URL = "http://localhost:3000/api";

class GenericService {
  async request({ url, method, headers = {}, data = {}, }) {
    const response = await axios[method](`${API_URL}/${url}`, { headers: headers, data: data });
    return response;
  }
}

export default new GenericService();