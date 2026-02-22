import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';
import { addToCart } from '../features/cart/cartSlice';

const useHomepageController = () => {
    const dispatch = useDispatch();
    const { items: products, loading, error } = useSelector((state) => state.product);

    // Initial Fetch
    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    // 1. New Arrivals: Posted within the last 4 days
    const newArrivals = useMemo(() => {
        const fourDaysAgo = new Date();
        fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);

        return products.filter(p => new Date(p.createdAt) >= fourDaysAgo).slice(0, 8); // Limit to 8 for neat UI rows
    }, [products]);

    // 2. Hot Deals: Discount >= 40%
    const hotDeals = useMemo(() => {
        return products.filter(p => p.discount >= 40).slice(0, 8); // Limit to 8
    }, [products]);

    // 3. Categorized Products: Grouping remaining products by category
    const categorizedProducts = useMemo(() => {
        // Collect IDs of products already shown in top sections so we don't repeat them
        const prominentIds = new Set([
            ...newArrivals.map(p => p._id),
            ...hotDeals.map(p => p._id)
        ]);

        const otherProducts = products.filter(p => !prominentIds.has(p._id));

        const categories = {};
        otherProducts.forEach(product => {
            const cat = product.category || 'Other';
            if (!categories[cat]) {
                categories[cat] = [];
            }
            categories[cat].push(product);
        });

        // Filter out categories with 0 items, limit items per row to 8
        const validCategories = {};
        Object.keys(categories).forEach(cat => {
            if (categories[cat].length > 0) {
                validCategories[cat] = categories[cat].slice(0, 8);
            }
        });

        return validCategories;
    }, [products, newArrivals, hotDeals]);

    // Handlers
    const handleAddToCart = (product) => {
        dispatch(addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            originalPrice: product.discount ? Math.round(product.price * (100 / (100 - product.discount))) : product.price * 1.2,
            image: product.images?.[0] || 'https://via.placeholder.com/150',
            seller: product.seller?._id || 'Unknown',
            stock: product.stock
        }));
    };

    return {
        products,
        newArrivals,
        hotDeals,
        categorizedProducts,
        loading,
        error,
        handleAddToCart
    };
};

export default useHomepageController;
