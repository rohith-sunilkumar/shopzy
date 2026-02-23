import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import ProductSection from '../components/user/ProductSection';
import useHomepageController from '../../controllers/useHomepageController';
import { Clock, Flame, Tags, Truck, ShieldCheck, CreditCard, HeadphonesIcon } from 'lucide-react';

const Dashboard = () => {
  const { newArrivals, hotDeals, categorizedProducts, loading, error, handleAddToCart } = useHomepageController();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Carousel — full width */}
      <HeroCarousel />

      {/* Trust Features Bar */}
      <div className="bg-white border-b border-gray-100 py-8 hidden md:block">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Free Express Shipping</h4>
                <p className="text-xs text-gray-500 mt-0.5">On orders over ₹999</p>
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Secure Shopping</h4>
                <p className="text-xs text-gray-500 mt-0.5">100% Secure Checkout</p>
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Flexible Payments</h4>
                <p className="text-xs text-gray-500 mt-0.5">Pay with Multiple Methods</p>
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center flex-shrink-0">
                <HeadphonesIcon className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">24/7 Premium Support</h4>
                <p className="text-xs text-gray-500 mt-0.5">Dedicated Customer Base</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 bg-gray-50/30">
        {/* 1. New Arrivals Section */}
        <ProductSection
          title="New Arrivals"
          subtitle="Just Dropped"
          Icon={Clock}
          bgColor="bg-white"
          products={newArrivals}
          loading={loading && newArrivals.length === 0}
          error={error}
          onAddToCart={handleAddToCart}
        />

        {/* Visual Separator */}
        <div className="max-w-[1400px] mx-auto px-4"><div className="h-px bg-gray-200/50 w-full" /></div>

        {/* 2. Hot Deals Section */}
        <ProductSection
          title="Hot Deals"
          subtitle="Up to 40% Off"
          Icon={Flame}
          bgColor="bg-gray-50/50"
          products={hotDeals}
          loading={loading && hotDeals.length === 0}
          error={error}
          onAddToCart={handleAddToCart}
        />

        {/* 3. Dynamic Category Sections */}
        {Object.entries(categorizedProducts).map(([category, products], index) => (
          <ProductSection
            key={category}
            title={`${category} Collection`}
            subtitle="Shop by Category"
            Icon={Tags}
            bgColor={index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
            products={products}
            loading={false} // Loading handled globally by top sections
            error={null}    // Error handled globally by top sections
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  )
}

export default Dashboard;
