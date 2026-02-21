import { useState } from 'react';
import axios from 'axios';
import { useSellerAuth } from '../models/SellerAuthContext';
import { toast } from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';

const useSellerLoginController = () => {
    const { sellerLogin, closeSellerAuth } = useSellerAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3000/seller/auth/login", formData, { withCredentials: true });
            sellerLogin(response.data.accessToken, response.data.seller);
            toast.success("Seller Login Successful!");
            closeSellerAuth();
            navigate('/seller');
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return { formData, loading, handleChange, handleSubmit };
};

export default useSellerLoginController;
