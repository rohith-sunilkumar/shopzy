import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import ProductSection from '../components/user/ProductSection';
import useHomepageController from '../../controllers/useHomepageController';
import { Clock, Flame, Tags } from 'lucide-react';

const Dashboard = () => {
  const { newArrivals, hotDeals, categorizedProducts, loading, error, handleAddToCart } = useHomepageController();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Carousel — full width */}
      <HeroCarousel />



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
  )
}

export default Dashboard;
