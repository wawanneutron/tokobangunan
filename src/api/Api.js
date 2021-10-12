import axios from "axios";

const Api = axios.create({
  baseURL: "http://ecommerce.timmixcode.my.id/api",
});

export default Api;
