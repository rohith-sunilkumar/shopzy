// src/features/products/productAPI.js
import axiosInstance from '../../services/axiosInstance';

export const fetchProductsAPI = async () => {
    const response = await axiosInstance.get('/products');
    return response.data;
};
