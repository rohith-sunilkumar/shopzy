import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../models/AuthContext';
import useLoginController from './useLoginController';
import useRegisterController from './useRegisterController';

const useAuthDialogController = () => {
    const { isAuthOpen, closeAuth, authMode, setAuthMode, accessToken, login } = useAuth();
    const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'
    const [otpStep, setOtpStep] = useState(1); // 1: Phone, 2: OTP
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            toast.loading("Authenticating with Google...");
            const res = await axios.post("http://localhost:3000/auth/google/login", {
                idToken: credentialResponse.credential,
            });

            login(res.data.accessToken);
            toast.dismiss();
            toast.success("Welcome back!");
            closeAuth();
        } catch (err) {
            console.error("Google Auth API Error:", err);
            toast.dismiss();
            toast.error("Google authentication failed.");
        }
    };

    const handleGoogleError = () => {
        toast.error("Google Login failed.");
    };

    const {
        formData: loginData,
        logging: loginLoading,
        loginError,
        loginSuccess,
        handleChange: handleLoginChange,
        handleSubmit: handleLoginSubmit,
        resetLogin
    } = useLoginController();

    const {
        formData: regData,
        loading: regLoading,
        handleChange: handleRegChange,
        handleSubmit: handleRegSubmit
    } = useRegisterController();

    useEffect(() => {
        if (accessToken && isAuthOpen) {
            if (!loginSuccess) {
                closeAuth();
            } else {
                setTimeout(() => {
                    closeAuth();
                }, 600);
            }
        }
    }, [accessToken, isAuthOpen, closeAuth, loginSuccess]);

    useEffect(() => {
        if (!isAuthOpen) {
            const timer = setTimeout(() => {
                resetLogin();
                setLoginMethod('email');
                setOtpStep(1);
                setPhone('');
                setOtp('');
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isAuthOpen, resetLogin]);

    return {
        isAuthOpen,
        closeAuth,
        authMode,
        setAuthMode,
        loginMethod,
        setLoginMethod,
        otpStep,
        setOtpStep,
        phone,
        setPhone,
        otp,
        setOtp,
        googleClientId,
        handleGoogleSuccess,
        handleGoogleError,
        loginData,
        loginLoading,
        loginError,
        loginSuccess,
        handleLoginChange,
        handleLoginSubmit,
        regData,
        regLoading,
        handleRegChange,
        handleRegSubmit
    };
};

export default useAuthDialogController;
