// hooks/useAxiosSecure.js
import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000', // 🔁 Change to your API base if needed
  withCredentials: true,            // Optional: only if using cookies
});

// ✅ Add request interceptor ONCE globally
axiosSecure.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// ✅ Optional: Handle 401/403 errors globally if needed
axiosSecure.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn('🔐 Unauthorized or Forbidden. Redirect if needed.');
      // You can logout user or show toast here
    }
    return Promise.reject(error);
  }
);

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
