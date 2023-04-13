import axios from "axios";

const api = axios.create({
  baseURL: "http://206.189.240.247:3000",
});

export default api;
