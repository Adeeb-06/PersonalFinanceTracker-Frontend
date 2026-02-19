import axios from "axios";

const api = axios.create({
  baseURL: "https://trackitbackend-two.vercel.app/",
  withCredentials: true,
});

export default api;

// trackitbackend-two.vercel.app/
