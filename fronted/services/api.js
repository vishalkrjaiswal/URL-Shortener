import axios from "axios";

const base = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API = axios.create({ baseURL: base });

export const createShortUrl = (url) => API.post("/create", { url });
