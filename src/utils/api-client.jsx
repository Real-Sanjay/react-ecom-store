import axios from "axios";

 export const apiClient = axios.create({
    baseURL: "https://cartwish-backend-rjnx.onrender.com/api",
});  