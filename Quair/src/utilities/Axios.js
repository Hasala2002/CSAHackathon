import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://api.waqi.info/feed/here/?token=c8ba0ea4a4e8b4b86c848063f1fdc66b88e07ae8",
  // "http://localhost:5000/aqi",
});

export default instance;
