import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://online-assessment-backend.onrender.com',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure Bearer token is correct
  }
});

export default axiosInstance;
