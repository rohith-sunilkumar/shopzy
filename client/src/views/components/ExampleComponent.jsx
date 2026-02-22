import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/productSlice';
import { addToCart } from '../../features/cart/cartSlice';

const ExampleComponent = () => {
    const dispatch = useDispatch();

    // Access states from the store
    const { items: products, loading, error } = useSelector((state) => state.product);
    const { totalQuantity, cartItems } = useSelector((state) => state.cart);

    useEffect(() => {
        // Fetch products on mount if empty
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    const handleAddToCart = (product) => {
        // Dispatching the addToCart action with the product payload
        dispatch(addToCart({
            id: product._id || product.id, // Handles different ID structures
            name: product.name,
            price: product.price,
            image: product.images ? product.images[0] : null,
            quantity: 1
        }));
    };

    return (
        <div className="p-4 border border-gray-200 rounded-lg max-w-2xl mx-auto my-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Redux Store Example</h2>
                <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Cart Items: {totalQuantity}
                </div>
            </div>

            {loading && <p className="text-gray-500 text-center py-4">Loading products...</p>}
            {error && <p className="text-red-500 text-center py-4">Error: {error}</p>}

            {!loading && products.length === 0 && (
                <p className="text-gray-500 text-center py-4">No products found. (Is backend running?)</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.slice(0, 4).map((product) => (
                    <div key={product._id || product.id} className="border p-4 rounded-lg flex flex-col justify-between">
                        <div>
                            <h3 className="font-semibold truncate">{product.name}</h3>
                            <p className="text-gray-600">${product.price}</p>
                        </div>
                        <button
                            onClick={() => handleAddToCart(product)}
                            className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-4 border-t">
                <h3 className="font-semibold mb-2">Current Cart Content (localStorage backed):</h3>
                <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
                    {JSON.stringify(cartItems, null, 2)}
                </pre>
            </div>
        </div>
    );
};

export default ExampleComponent;
