import axios from "axios";

const Api = axios.create({
  // baseURL: "http://127.0.0.1:8000/api",
  baseURL: "http://ecommerce.timmixcode.my.id/api",
});

export default Api;
