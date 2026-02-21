import api from "../api/axios.js";

const AuthModel = {
    login: async (formData) => {
        const res = await api.post("/auth/login", formData);
        return res.data;
    },
    register: async (formData) => {
        const res = await api.post("/auth/register", formData);
        return res.data;
    }
};

export default AuthModel;
