import { useState, useCallback } from "react";
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
    const [loginError, setLoginError] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);

    const resetLogin = useCallback(() => {
        setFormData({ email: "", password: "" });
        setLogging(false);
        setLoginError("");
        setLoginSuccess(false);
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLogging(true);
        setLoginError("");

        try {
            const data = await AuthModel.login(formData);
            authLogin(data.accessToken);

            setLoginSuccess(true);
            toast.success(`Welcome back${data.user?.name ? `, ${data.user.name}` : ''}! 🎉`);

            // Delay navigation slightly so the success state/modal close animation can play
            setTimeout(() => {
                navigate("/dashboard");
            }, 600);
        } catch (error) {
            console.error("Login error:", error);
            const message = error.response?.data?.message || "Invalid credentials. Please try again.";
            setLoginError(message);
            toast.error(message);

            // Auto-clear the error state after the animation finishes so it can trigger again on subsequent failures
            setTimeout(() => setLoginError(""), 1000);
        } finally {
            setLogging(false);
        }
    };

    return {
        formData,
        logging,
        loginError,
        loginSuccess,
        handleChange,
        handleSubmit,
        resetLogin,
    };
};

export default useLoginController;
