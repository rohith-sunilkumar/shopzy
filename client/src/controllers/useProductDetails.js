import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

const useProductDetails = (productId) => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) return;

            setLoading(true);
            setError(null);

            try {
                const response = await api.get(`/products/${productId}`);
                setProduct(response.data);
            } catch (err) {
                console.error("Error fetching product details:", err);
                setError(err.response?.data?.message || "Failed to load product details.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();

        // Reset state on ID change
        setSelectedImage(0);
        setQuantity(1);
    }, [productId]);

    const handleAddToCart = () => {
        if (!product) return;

        // Dispatch to Redux cart
        dispatch(addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            originalPrice: product.discount ? Math.round(product.price * (100 / (100 - product.discount))) : product.price * 1.2,
            image: product.images?.[0] || 'https://via.placeholder.com/150',
            seller: product.seller?._id || 'Unknown',
            stock: product.stock,
            quantity: quantity
        }));
    };

    const handleIncrement = () => {
        if (quantity < (product?.stock || 1)) {
            setQuantity(prev => prev + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    return {
        product,
        loading,
        error,
        selectedImage,
        setSelectedImage,
        quantity,
        handleIncrement,
        handleDecrement,
        handleAddToCart
    };
};

export default useProductDetails;
