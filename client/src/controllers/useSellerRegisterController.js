import { useState } from 'react';
import axios from 'axios';
import { useSellerAuth } from '../models/SellerAuthContext';
import { toast } from 'react-hot-toast';

const useSellerRegisterController = () => {
    const { setSellerAuthMode } = useSellerAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        storeName: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            await axios.post("http://localhost:3000/seller/auth/register", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                storeName: formData.storeName
            });
            toast.success("Seller registration successful! Please sign in.");
            setSellerAuthMode('login');
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return { formData, loading, handleChange, handleSubmit };
};

export default useSellerRegisterController;
