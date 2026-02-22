import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../../models/AdminAuthContext";

const AdminProtectedRoute = ({ children }) => {
    const { adminToken } = useAdminAuth();

    if (!adminToken) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default AdminProtectedRoute;
