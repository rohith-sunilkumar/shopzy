import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthModel from "../models/AuthModel";

const useRegisterController = () => {
    const navigate = useNavigate();
    const [formData, setformData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match ❌");
            return;
        }
        setLoading(true);
        try {
            await AuthModel.register(formData);
            toast.success("Registration successful!");
            navigate("/");
        } catch (err) {
            console.error("Registration error:", err);
            toast.error(err.response?.data?.message || "Registration Failed, Try Again");
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        loading,
        handleChange,
        handleSubmit,
    };
};

export default useRegisterController;
