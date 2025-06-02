import axios from "axios";

export default axios.create({
  baseURL: "https://crud-api-development-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
