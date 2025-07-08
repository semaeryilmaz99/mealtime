import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { shoppingListServices } from '../lib/firebaseServices';
import { useAuth } from './AuthContext';

const ShoppingListContext = createContext();

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider');
  }
  return context;
};

export const ShoppingListProvider = ({ children }) => {
  const [shoppingList, setShoppingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const removalTimers = useRef({});

  // Load shopping list from Firebase when user logs in
  useEffect(() => {
    if (currentUser) {
      loadShoppingList();
    } else {
      setShoppingList([]);
    }
  }, [currentUser]);

  const loadShoppingList = async () => {
    console.log('loadShoppingList called, currentUser:', currentUser);
    if (!currentUser) return;
    setLoading(true);
    try {
      const items = await shoppingListServices.getAllShoppingItems();
      console.log('Loaded shopping list items:', items);
      setShoppingList(items);
    } catch (error) {
      console.error('Error loading shopping list:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToShoppingList = async (ingredient) => {
    if (!currentUser) return;
    setLoading(true);
    try {
      console.log('Adding to shopping list:', ingredient);
      // Prevent duplicates
      const exists = shoppingList.find(item => item.name === ingredient.name && item.recipe === ingredient.recipe);
      if (exists) return;
      const newItem = await shoppingListServices.addShoppingItem({
        name: ingredient.name,
        recipe: ingredient.recipe,
        checked: false
      });
      setShoppingList(prev => [...prev, newItem]);
    } catch (error) {
      console.error('Error adding to shopping list:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromShoppingList = async (ingredientId) => {
    if (!currentUser) return;
    setLoading(true);
    try {
      await shoppingListServices.deleteShoppingItem(ingredientId);
      setShoppingList(prev => prev.filter(item => item.id !== ingredientId));
      if (removalTimers.current[ingredientId]) {
        clearTimeout(removalTimers.current[ingredientId]);
        delete removalTimers.current[ingredientId];
      }
    } catch (error) {
      console.error('Error removing from shopping list:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearShoppingList = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const deletePromises = shoppingList.map(item => shoppingListServices.deleteShoppingItem(item.id));
      await Promise.all(deletePromises);
      setShoppingList([]);
      Object.values(removalTimers.current).forEach(timer => clearTimeout(timer));
      removalTimers.current = {};
    } catch (error) {
      console.error('Error clearing shopping list:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleIngredientChecked = async (ingredientId) => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const item = shoppingList.find(item => item.id === ingredientId);
      if (!item) return;
      const newChecked = !item.checked;
      await shoppingListServices.updateShoppingItem(ingredientId, { completed: newChecked });
      setShoppingList(prev => prev.map(item => {
        if (item.id === ingredientId) {
          if (newChecked) {
            if (removalTimers.current[ingredientId]) {
              clearTimeout(removalTimers.current[ingredientId]);
            }
            removalTimers.current[ingredientId] = setTimeout(async () => {
              await removeFromShoppingList(ingredientId);
              delete removalTimers.current[ingredientId];
            }, 3000);
          } else {
            if (removalTimers.current[ingredientId]) {
              clearTimeout(removalTimers.current[ingredientId]);
              delete removalTimers.current[ingredientId];
            }
          }
          return { ...item, checked: newChecked, completed: newChecked };
        }
        return item;
      }));
    } catch (error) {
      console.error('Error toggling ingredient:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      Object.values(removalTimers.current).forEach(timer => clearTimeout(timer));
    };
  }, []);

  console.log('Current user in ShoppingListProvider:', currentUser);

  return (
    <ShoppingListContext.Provider value={{
      shoppingList,
      addToShoppingList,
      removeFromShoppingList,
      clearShoppingList,
      toggleIngredientChecked,
      loading
    }}>
      {children}
    </ShoppingListContext.Provider>
  );
}; 