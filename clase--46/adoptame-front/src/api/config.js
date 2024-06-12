import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://50045adoptame-qa.up.railway.app/',
  withCredentials: true,
});

export default axiosInstance;
