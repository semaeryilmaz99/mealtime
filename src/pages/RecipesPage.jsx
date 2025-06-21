import React from 'react';
import RecipeList from '../components/RecipeList';

const RecipesPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">All Recipes</h1>
      <RecipeList showTitle={false} />
    </div>
  );
};

export default RecipesPage; 