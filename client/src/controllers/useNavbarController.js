import { useNavigate } from 'react-router-dom';
import { useAuth } from '../models/AuthContext';
import { useSellerAuth } from '../models/SellerAuthContext';
import { useSelector } from 'react-redux';

const useNavbarController = () => {
    const navigate = useNavigate();
    const { accessToken, logout, user, openAuth } = useAuth();
    const { sellerToken, sellerLogout, openSellerAuth } = useSellerAuth();

    const { totalQuantity, totalAmount, cartItems } = useSelector((state) => state.cart);
    const cartCount = totalQuantity;
    const cartTotal = `₹${totalAmount.toLocaleString('en-IN')}`;

    const handleSellerNavigation = () => {
        if (sellerToken) {
            navigate('/seller/overview');
        } else {
            openSellerAuth('login');
        }
    };

    return {
        accessToken,
        user,
        logout,
        openAuth,
        sellerToken,
        openSellerAuth,
        cartCount,
        cartTotal,
        cartItems,
        handleSellerNavigation
    };
};

export default useNavbarController;
