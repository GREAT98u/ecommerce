// lib/api/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true, // REQUIRED for JWT cookies
  headers: {
    "Content-Type": "application/json",
  },
});

/* ============================
   RESPONSE INTERCEPTOR
   Global auth handling
============================ */

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    // ONLY logout if user was already authenticated
    if (status === 401 && typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("auth:unauthorized")
      );
    }

    return Promise.reject(error);
  }
);


export default api;
