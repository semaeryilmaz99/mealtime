import { useState, useEffect } from 'react';
import { recipeServices, shoppingListServices } from './firebaseServices.js';

// Custom hook for recipes
export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const data = await recipeServices.getAllRecipes();
      setRecipes(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addRecipe = async (recipeData) => {
    try {
      const newRecipe = await recipeServices.addRecipe(recipeData);
      setRecipes(prev => [newRecipe, ...prev]);
      return newRecipe;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateRecipe = async (id, recipeData) => {
    try {
      const updatedRecipe = await recipeServices.updateRecipe(id, recipeData);
      setRecipes(prev => 
        prev.map(recipe => 
          recipe.id === id ? updatedRecipe : recipe
        )
      );
      return updatedRecipe;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteRecipe = async (id) => {
    try {
      await recipeServices.deleteRecipe(id);
      setRecipes(prev => prev.filter(recipe => recipe.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return {
    recipes,
    loading,
    error,
    fetchRecipes,
    addRecipe,
    updateRecipe,
    deleteRecipe
  };
};

// Custom hook for shopping list
export const useShoppingList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await shoppingListServices.getAllShoppingItems();
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (itemData) => {
    try {
      const newItem = await shoppingListServices.addShoppingItem(itemData);
      setItems(prev => [newItem, ...prev]);
      return newItem;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateItem = async (id, updates) => {
    try {
      const updatedItem = await shoppingListServices.updateShoppingItem(id, updates);
      setItems(prev => 
        prev.map(item => 
          item.id === id ? updatedItem : item
        )
      );
      return updatedItem;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteItem = async (id) => {
    try {
      await shoppingListServices.deleteShoppingItem(id);
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const clearCompleted = async () => {
    try {
      await shoppingListServices.clearCompletedItems();
      setItems(prev => prev.filter(item => !item.completed));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    loading,
    error,
    fetchItems,
    addItem,
    updateItem,
    deleteItem,
    clearCompleted
  };
}; 