// src/features/auth/authAPI.js
import axiosInstance from '../../services/axiosInstance';

export const loginAPI = async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
};
