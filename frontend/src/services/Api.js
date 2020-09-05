import axios from "axios";

export default () => {
  return axios.create({
    baseURL: process.env.LG_BACKEND_IP
  });
};