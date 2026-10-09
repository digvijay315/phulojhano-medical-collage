import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: 'https://phulojhano-medical-collage-1.onrender.com/api',
});

export default api;
