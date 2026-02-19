import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: "https://trackitbackend-two.vercel.app/",
  withCredentials: true,
});


export default api;
