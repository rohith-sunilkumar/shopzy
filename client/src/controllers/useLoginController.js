import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../models/AuthContext";
import AuthModel from "../models/AuthModel";

const useLoginController = () => {
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [logging, setLogging] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLogging(true);

        try {
            const data = await AuthModel.login(formData);
            authLogin(data.accessToken);
            toast.success("Login successful 🎉");
            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || "Login Failed");
        } finally {
            setLogging(false);
        }
    };

    return {
        formData,
        logging,
        handleChange,
        handleSubmit,
    };
};

export default useLoginController;
