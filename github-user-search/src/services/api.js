import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_GITHUB_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_KEY}`,
  },
});

export default api;