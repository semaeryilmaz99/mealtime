import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import RecipeModal from './RecipeModal';
import { useModal } from '../context/ModalContext';

const recipes = [
  {
    "image": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "title": "Classic Caesar Salad",
    "diet": "Vegetarian",
    "time": 15
  },
  {
    "image": "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "title": "Pancakes with Berries",
    "diet": "Vegetarian",
    "time": 20
  },
  {
    "image": "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "title": "Gourmet Burger",
    "diet": "None",
    "time": 30
  },
  {
    "image": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "title": "Spaghetti Bolognese",
    "diet": "None",
    "time": 45
  },
  {
    "image": "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "title": "Grilled Salmon",
    "diet": "Pescatarian",
    "time": 25
  },
  {
    "image": "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "title": "Avocado Toast",
    "diet": "Vegan",
    "time": 10
  },
  {
    "image": "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "title": "Chicken Burrito",
    "diet": "None",
    "time": 35
  },
  {
    "image": "https://images.pexels.com/photos/1199960/pexels-photo-1199960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "title": "Margherita Pizza",
    "diet": "Vegetarian",
    "time": 50
  },
  {
    "image": "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "title": "Chocolate Lava Cake",
    "diet": "Vegetarian",
    "time": 40
  }
];

const RecipeList = ({ showTitle = true }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    openModal();
  };

  const handleCloseModal = () => {
    closeModal();
    setSelectedRecipe(null);
  };

  return (
    <div className="mt-8">
      {showTitle && <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Recipes</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} onClick={handleRecipeClick} />
        ))}
      </div>
      
      <RecipeModal 
        recipe={selectedRecipe}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default RecipeList; 