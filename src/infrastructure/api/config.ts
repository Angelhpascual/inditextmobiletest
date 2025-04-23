import axios from 'axios';

export const BASE_URL = 'https://prueba-tecnica-api-tienda-moviles.onrender.com';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '87909682e6cd74208f41a6ef39fe4191',
  },
});
