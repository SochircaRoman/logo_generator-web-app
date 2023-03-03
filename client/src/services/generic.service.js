import axios from "axios";

const API_URL = "http://localhost:3000/api";

class GenericService {
  async request({ url, method, file, headers, data, }) {
    const response = await axios[method](`${API_URL}/${url}`, file, { data }, { headers: headers });
    return response;
  }
}

export default new GenericService();