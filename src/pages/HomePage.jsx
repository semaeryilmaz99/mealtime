import React from 'react';
import RecipeList from '../components/RecipeList';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <div className="bouncing-container mb-8 mt-8">
        <p className="text-gray-600 text-center">
          Discover recipes that fit your lifestyle, choose your preferences and plan your meals with ease.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="info-card bg-white p-6 rounded-lg shadow-md cursor-pointer transition-shadow duration-300 ease-out">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Start</h3>
          <p className="text-gray-600">Browse meal categories and find your next favorite recipe.</p>
        </div>
        <div className="info-card bg-white p-6 rounded-lg shadow-md cursor-pointer transition-shadow duration-300 ease-out">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Dietary Preferences</h3>
          <p className="text-gray-600">Filter recipes based on your dietary needs and preferences.</p>
        </div>
        <div className="info-card bg-white p-6 rounded-lg shadow-md cursor-pointer transition-shadow duration-300 ease-out">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Meal Planning</h3>
          <p className="text-gray-600">Create personalized meal plans for the week or month.</p>
        </div>
      </div>
      <RecipeList />
      <div className="text-center mt-8">
        <Link to="/recipes" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-blue-700 to-blue-900 bg-[length:200%_auto] hover:bg-[right_center] shadow-md hover:shadow-lg transform hover:scale-105 hover:translate-x-1 transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          See More Recipes
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </>
  );
};

export default HomePage; 