import React from 'react';

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
      onClick={() => onClick(recipe)}
    >
      <img src={recipe.image} alt={recipe.title} className="w-full h-60 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">{recipe.title}</h3>
        <div className={`flex ${recipe.diet === 'None' ? 'justify-end' : 'justify-between'} items-center text-gray-600 text-base`}>
          {recipe.diet !== 'None' && (
            <span className="font-medium bg-gray-200 px-3 py-1 rounded-full text-base">{recipe.diet}</span>
          )}
          <span className="ml-2">{recipe.time} min</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard; 