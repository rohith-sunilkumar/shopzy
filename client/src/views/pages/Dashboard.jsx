import React from 'react'
import { useAuth } from '../../models/AuthContext'

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center min-h-[60vh] flex flex-col justify-center items-center">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
        Welcome to your Premium Shopping Experience
      </h2>
      <p className="text-gray-500 max-w-lg mx-auto">
        Explore the latest trends, amazing deals, and a wide variety of products curated just for you.
      </p>
    </div>
  )
}

export default Dashboard
