import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000', // Default fallback
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to attach JWT token
axiosInstance.interceptors.request.use(
    (config) => {
        // We can get the token from localStorage or from the store (if accessible here, but localStorage is safer to avoid circular dependencies in some setups)
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle global errors (e.g., token expiration)
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Optional: Handle unauthorized access globally (e.g., dispatch logout, redirect)
            console.error('Unauthorized access. Token might be expired.');
            // We dispatch the clear token action from the component or store middleware, not here directly to avoid circular dependency
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
