import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useProductDetails from '../../../controllers/useProductDetails';
import ProductGallery from '../../components/user/product/ProductGallery';
import ProductInfo from '../../components/user/product/ProductInfo';
import ProductActionBox from '../../components/user/product/ProductActionBox';

const ProductDetails = () => {
    const { id } = useParams();
    const {
        product,
        loading,
        error,
        selectedImage,
        setSelectedImage,
        quantity,
        handleIncrement,
        handleDecrement,
        handleAddToCart
    } = useProductDetails(id);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong.</h2>
                    <p className="text-gray-500">{error || "Product not found"}</p>
                    <Link to="/" className="mt-4 inline-block text-indigo-600 font-medium hover:underline">
                        Return to Homepage
                    </Link>
                </div>
            </div>
        );
    }

    const price = product.price || 0;
    const discount = product.discount || 0;
    const originalPrice = discount > 0
        ? Math.round(price / (1 - discount / 100))
        : Math.round(price * 1.2);

    // Provide fallback images if empty
    const images = product.images && product.images.length > 0
        ? product.images
        : ['https://via.placeholder.com/600x600?text=No+Image'];

    return (
        <div className="min-h-screen pt-8 pb-16 bg-white">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">

                {/* Breadcrumbs */}
                <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
                    <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
                    <span>›</span>
                    <span className="hover:text-indigo-600 transition-colors cursor-pointer">{product.category || 'Category'}</span>
                    {product.subCategory && (
                        <>
                            <span>›</span>
                            <span className="hover:text-indigo-600 transition-colors cursor-pointer">{product.subCategory}</span>
                        </>
                    )}
                    <span>›</span>
                    <span className="text-gray-900 font-medium truncate max-w-xs">{product.name}</span>
                </div>

                {/* Main 3-Column Layout */}
                <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 relative items-start">
                    <ProductGallery
                        images={images}
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                        productName={product.name}
                    />

                    <ProductInfo
                        product={product}
                        discount={discount}
                        originalPrice={originalPrice}
                        price={price}
                    />

                    <ProductActionBox
                        product={product}
                        price={price}
                        quantity={quantity}
                        handleIncrement={handleIncrement}
                        handleDecrement={handleDecrement}
                        handleAddToCart={handleAddToCart}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
