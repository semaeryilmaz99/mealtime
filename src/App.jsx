import React from 'react'
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import RightSidebar from './components/RightSidebar'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <main className="flex-1 md:ml-64 md:mr-80 mobile-main-content">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Mealtime. Organized meals.</h1>
            <p className="text-gray-600 mb-4">
              Discover delicious recipes and plan your meals with ease.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md bounce-on-hover cursor-pointer transition-shadow duration-300 ease-out">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Start</h3>
                <p className="text-gray-600">Browse meal categories and find your next favorite recipe.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md bounce-on-hover cursor-pointer transition-shadow duration-300 ease-out">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Dietary Preferences</h3>
                <p className="text-gray-600">Filter recipes based on your dietary needs and preferences.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md bounce-on-hover cursor-pointer transition-shadow duration-300 ease-out">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Meal Planning</h3>
                <p className="text-gray-600">Create personalized meal plans for the week or month.</p>
              </div>
            </div>
          </div>
        </main>
        <RightSidebar />
      </div>
    </div>
  )
}

export default App
