import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{recipe.title}</h3>
        <div className={`flex ${recipe.diet === 'None' ? 'justify-end' : 'justify-between'} items-center text-gray-600 text-sm`}>
          {recipe.diet !== 'None' && (
            <span className="font-medium bg-gray-200 px-2 py-1 rounded-full">{recipe.diet}</span>
          )}
          <span>{recipe.time} min</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard; 