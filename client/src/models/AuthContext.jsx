import { createContext, useContext, useState, useEffect, useLayoutEffect } from "react";
import api from "../api/axios";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const [loading, setLoading] = useState(true);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'

    const openAuth = (mode = 'login') => {
        setAuthMode(mode);
        setIsAuthOpen(true);
    };

    const closeAuth = () => setIsAuthOpen(false);

    const login = (token) => {
        localStorage.setItem("accessToken", token);
        setAccessToken(token);
    };

    const logout = async () => {
        try {
            await axios.post("http://localhost:3000/auth/logout", {}, { withCredentials: true });
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            localStorage.removeItem("accessToken");
            setAccessToken(null);
        }
    };

    const refreshAccessToken = async () => {
        try {
            const response = await axios.get("http://localhost:3000/auth/refresh", {
                withCredentials: true,
            });
            const { accessToken } = response.data;
            login(accessToken);
            return accessToken;
        } catch (error) {
            if (error.response?.status !== 401) {
                console.error("Token refresh failed:", error);
            }
            localStorage.removeItem("accessToken");
            setAccessToken(null);
            return null;
        }
    };

    // Use useLayoutEffect to attach interceptors before any child components make requests
    useLayoutEffect(() => {
        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    const newToken = await refreshAccessToken();
                    if (newToken) {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return api(originalRequest);
                    }
                }

                return Promise.reject(error); 0
            }
        );

        return () => {
            api.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    useEffect(() => {
        const verifySession = async () => {
            if (accessToken) {
                try {
                    // Make a simple request to verify current token
                    await api.get("/auth/dashboard");
                } catch (error) {
                    // Interceptor will handle the refresh, if it fails, accessToken will be null
                    console.error("Initial verification failed", error);
                }
            }
            setLoading(false);
        };
        verifySession();
    }, []);

    return (
        <AuthContext.Provider value={{
            accessToken, login, logout, refreshAccessToken, loading,
            isAuthOpen, authMode, openAuth, closeAuth, setAuthMode
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
