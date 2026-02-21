import React from 'react'
import HeroCarousel from '../components/HeroCarousel'

const Dashboard = () => {
  return (
    <div>
      {/* Hero Carousel — full width */}
      <HeroCarousel />

      {/* Welcome Section */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Welcome to your Premium Shopping Experience
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Explore the latest trends, amazing deals, and a wide variety of products curated just for you.
        </p>
      </div>
    </div>
  )
}

export default Dashboard
