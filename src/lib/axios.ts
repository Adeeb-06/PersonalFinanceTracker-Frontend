import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: "http://localhost:9000/",
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();

  console.log(session , "axios")

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
});

export default api;
