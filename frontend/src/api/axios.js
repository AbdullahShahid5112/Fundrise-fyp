// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api", // ✅ dynamic
  withCredentials: true, // ✅ keeps cookies/session
  headers: {
    "Content-Type": "application/json", // ✅ optional if you're not uploading files
  },
});

export default api;
