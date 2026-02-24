import { createContext, useContext, useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";

// Custom axios instance for seller API
const sellerApi = axios.create({
    baseURL: "http://localhost:3000/seller/auth",
    withCredentials: true,
});

const SellerAuthContext = createContext();

export const SellerAuthProvider = ({ children }) => {
    const [sellerToken, setSellerToken] = useState(localStorage.getItem("sellerToken"));
    const [seller, setSeller] = useState(null);
    const [sellerLoading, setSellerLoading] = useState(true);
    const [isSellerAuthOpen, setIsSellerAuthOpen] = useState(false);
    const [sellerAuthMode, setSellerAuthMode] = useState('login'); // 'login' or 'register'

    const openSellerAuth = (mode = 'login') => {
        setSellerAuthMode(mode);
        setIsSellerAuthOpen(true);
    };

    const closeSellerAuth = () => setIsSellerAuthOpen(false);

    const sellerLogin = (token, sellerData) => {
        localStorage.setItem("sellerToken", token);
        setSellerToken(token);
        setSeller(sellerData);
    };

    const sellerLogout = async () => {
        try {
            await sellerApi.post("/logout");
        } catch (error) {
            console.error("Seller logout failed:", error);
        } finally {
            localStorage.removeItem("sellerToken");
            setSellerToken(null);
            setSeller(null);
        }
    };

    const refreshSellerToken = async () => {
        try {
            const response = await sellerApi.get("/refresh");
            const { accessToken } = response.data;
            localStorage.setItem("sellerToken", accessToken);
            setSellerToken(accessToken);
            return accessToken;
        } catch (error) {
            if (error.response?.status !== 401) {
                console.error("Seller token refresh failed:", error);
            }
            localStorage.removeItem("sellerToken");
            setSellerToken(null);
            setSeller(null);
            return null;
        }
    };

    useLayoutEffect(() => {
        const requestInterceptor = sellerApi.interceptors.request.use(
            (config) => {
                if (sellerToken) {
                    config.headers.Authorization = `Bearer ${sellerToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = sellerApi.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                // Avoid infinite loop if refresh itself fails
                if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes('/refresh')) {
                    originalRequest._retry = true;
                    const newToken = await refreshSellerToken();
                    if (newToken) {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return sellerApi(originalRequest);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            sellerApi.interceptors.request.eject(requestInterceptor);
            sellerApi.interceptors.response.eject(responseInterceptor);
        };
    }, [sellerToken]);

    useEffect(() => {
        const controller = new AbortController();
        const verifySellerSession = async (signal) => {
            try {
                if (sellerToken) {
                    const response = await sellerApi.get("/profile", { signal });
                    setSeller(response.data);
                }
                // When no sellerToken, skip refresh to avoid 401s for visitors who never logged in
            } catch (error) {
                if (error.name === 'CanceledError' || error.name === 'AbortError') return;
                if (error.response?.status === 404) {
                    console.warn("Seller account no longer exists. Clearing session.");
                    localStorage.removeItem("sellerToken");
                    setSellerToken(null);
                    setSeller(null);
                    window.location.href = '/';
                    return;
                }
                if (error.response?.status !== 401) {
                    console.error("Seller session verification failed:", error);
                }
                localStorage.removeItem("sellerToken");
                setSellerToken(null);
                setSeller(null);
            } finally {
                setSellerLoading(false);
            }
        };
        verifySellerSession(controller.signal);
        return () => controller.abort();
    }, []);

    return (
        <SellerAuthContext.Provider value={{
            sellerToken, seller, sellerLoading, sellerLogin, sellerLogout,
            isSellerAuthOpen, sellerAuthMode, openSellerAuth, closeSellerAuth, setSellerAuthMode,
            sellerApi
        }}>
            {!sellerLoading && children}
        </SellerAuthContext.Provider>
    );
};

export const useSellerAuth = () => useContext(SellerAuthContext);
