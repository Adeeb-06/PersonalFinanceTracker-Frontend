import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: "https://trackitbackend-two.vercel.app/",
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();

  console.log(session?.accessToken , "axios")

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
});

export default api;
