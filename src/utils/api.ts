import axios from "axios";

export const API_CALL = axios.create({
  baseURL: `https://api.themoviedb.org`,
  headers: {
    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
  },
});
