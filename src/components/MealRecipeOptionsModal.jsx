import React, { useState } from 'react';
import RecipeDetailModal from './RecipeDetailModal';

const MealRecipeOptionsModal = ({ isOpen, onClose, mealName, recipeOptions = [], dailyMeals = null }) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setDetailOpen(true);
  };

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 glassy-modal-overlay flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="glassy-modal max-w-2xl w-full p-8 relative" onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-extrabold text-blue-800 drop-shadow-lg">{mealName}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-6">
            {dailyMeals ? (
              Object.entries(dailyMeals).map(([type, value], idx) => (
                <div key={idx} className={`flex bg-white/60 rounded-2xl p-4 shadow-xl border border-blue-100 items-center gap-6`}> 
                  <div className="flex-1 min-w-0">
                    <div className={`font-bold text-lg mb-1 ${type.toLowerCase().includes('snack') ? 'text-purple-600' : 'text-blue-700'}`}>{type}</div>
                    <div className="text-gray-700 text-base font-medium">{value || '-'}</div>
                  </div>
                </div>
              ))
            ) : recipeOptions.length === 0 ? (
              <div className="text-gray-500 text-center">No recipes found for this meal.</div>
            ) : (
              recipeOptions.map((recipe, idx) => (
                <div
                  key={idx}
                  className="flex bg-white/60 rounded-2xl p-4 shadow-xl border border-blue-100 items-center gap-6 hover:shadow-2xl transition-all duration-200 group"
                >
                  <img
                    src={recipe.photo || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80'}
                    alt={recipe.title}
                    className="w-24 h-24 rounded-xl object-cover shadow-md border border-white/70 group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-blue-700 text-lg mb-1 truncate">{recipe.title}</div>
                    <div className="text-gray-700 text-sm mb-3 truncate">{recipe.description}</div>
                    <button
                      className="mt-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition-colors duration-200"
                      onClick={() => handleViewRecipe(recipe)}
                    >
                      View Recipe
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <RecipeDetailModal isOpen={detailOpen} onClose={() => setDetailOpen(false)} recipe={selectedRecipe} />
    </>
  );
};

export default MealRecipeOptionsModal; 