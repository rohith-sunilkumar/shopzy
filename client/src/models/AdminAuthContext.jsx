import { createContext, useContext, useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";

const adminApi = axios.create({
    baseURL: "http://localhost:3000/admin",
    withCredentials: true,
});

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken"));
    const [adminLoading, setAdminLoading] = useState(true);

    const adminLogin = (token) => {
        localStorage.setItem("adminToken", token);
        setAdminToken(token);
    };

    const adminLogout = async () => {
        try {
            await adminApi.post("/auth/logout");
        } catch (error) {
            console.error("Admin logout failed:", error);
        } finally {
            localStorage.removeItem("adminToken");
            setAdminToken(null);
            // hard reload to reset state
            window.location.href = '/admin/login';
        }
    };

    const refreshAdminToken = async () => {
        try {
            const response = await adminApi.get("/auth/refresh");
            const { accessToken } = response.data;
            localStorage.setItem("adminToken", accessToken);
            setAdminToken(accessToken);
            return accessToken;
        } catch (error) {
            localStorage.removeItem("adminToken");
            setAdminToken(null);
            return null;
        }
    };

    useLayoutEffect(() => {
        const requestInterceptor = adminApi.interceptors.request.use(
            (config) => {
                if (adminToken) {
                    config.headers.Authorization = `Bearer ${adminToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = adminApi.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes('/refresh')) {
                    originalRequest._retry = true;
                    const newToken = await refreshAdminToken();
                    if (newToken) {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return adminApi(originalRequest);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            adminApi.interceptors.request.eject(requestInterceptor);
            adminApi.interceptors.response.eject(responseInterceptor);
        };
    }, [adminToken]);

    useEffect(() => {
        const verifyAdminSession = async () => {
            try {
                if (!adminToken) {
                    const newToken = await refreshAdminToken();
                    if (newToken) {
                        await adminApi.get("/stats");
                    }
                } else {
                    await adminApi.get("/stats");
                }
            } catch (error) {
                localStorage.removeItem("adminToken");
                setAdminToken(null);
            } finally {
                setAdminLoading(false);
            }
        };
        verifyAdminSession();
    }, []);

    return (
        <AdminAuthContext.Provider value={{
            adminToken, adminLoading, adminLogin, adminLogout, adminApi
        }}>
            {!adminLoading && children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
