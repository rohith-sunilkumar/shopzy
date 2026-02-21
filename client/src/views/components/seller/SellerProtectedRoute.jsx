import { Navigate } from "react-router-dom";
import { useSellerAuth } from "../../../models/SellerAuthContext";

const SellerProtectedRoute = ({ children }) => {
    const { sellerToken, sellerLoading } = useSellerAuth();

    if (sellerLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!sellerToken) {
        // Redirect to home or show an unauthorized message
        // In our current flow, the navbar handles the trigger, 
        // but this protects direct URL access.
        return <Navigate to="/" replace />;
    }

    return children;
};

export default SellerProtectedRoute;
