import axios from "axios";

const baseURl= import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"

const api = axios.create({
    baseURL: baseURl,
})

export default api;
