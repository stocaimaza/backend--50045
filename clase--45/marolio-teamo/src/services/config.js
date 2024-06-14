// services/config.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api', // Cambiar la URL por la del servidor backend
  timeout: 5000 // Tiempo de espera de la solicitud
});

export default instance;
