import axios from "axios";

const apiHandler = axios.create({
    baseURL: "http://localhost:8000",
})

export { apiHandler };