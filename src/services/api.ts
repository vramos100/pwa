import axios from "axios";

const api = axios.create({
  baseURL:
    "http://206.189.240.247:3000/checklist/d501441c-51bf-4a4f-a7ca-581b7f6ddf52",
});

export default api;
