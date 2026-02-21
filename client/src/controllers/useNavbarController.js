import { useNavigate } from 'react-router-dom';
import { useAuth } from '../models/AuthContext';
import { useSellerAuth } from '../models/SellerAuthContext';

const useNavbarController = () => {
    const navigate = useNavigate();
    const { accessToken, logout, user, openAuth } = useAuth();
    const { sellerToken, sellerLogout, openSellerAuth } = useSellerAuth();

    // Mock cart data — replace with real cart context later
    const cartCount = 3;
    const cartTotal = '₹9,296';
    const cartItems = [
        { id: 1, name: 'Premium Wireless Headphones', price: '₹4,999', quantity: 1, image: 'https://placehold.co/56x56/f0f4ff/4f46e5?text=🎧' },
        { id: 2, name: 'Classic Cotton T-Shirt', price: '₹899', quantity: 2, image: 'https://placehold.co/56x56/f0fdf4/16a34a?text=👕' },
        { id: 3, name: 'Smart Fitness Band Pro', price: '₹2,499', quantity: 1, image: 'https://placehold.co/56x56/fef2f2/dc2626?text=⌚' }
    ];

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
