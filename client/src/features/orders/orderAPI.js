// src/features/orders/orderAPI.js
import axiosInstance from '../../services/axiosInstance';

export const createOrderAPI = async (orderData) => {
    // Assuming backend will add a /orders endpoint based on standard REST practices
    const response = await axiosInstance.post('/orders', orderData);
    return response.data;
};

export const fetchOrderHistoryAPI = async () => {
    const response = await axiosInstance.get('/orders/myorders');
    return response.data;
};
