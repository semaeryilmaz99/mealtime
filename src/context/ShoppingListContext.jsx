import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

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
  // Store timers for auto-removal
  const removalTimers = useRef({});

  const addToShoppingList = (ingredient) => {
    setShoppingList(prev => {
      const exists = prev.find(item => item.name === ingredient.name && item.recipe === ingredient.recipe);
      if (exists) {
        return prev;
      }
      return [...prev, { ...ingredient, id: Date.now() + Math.random() }];
    });
  };

  const removeFromShoppingList = (ingredientId) => {
    setShoppingList(prev => prev.filter(item => item.id !== ingredientId));
    // Clear any pending timer
    if (removalTimers.current[ingredientId]) {
      clearTimeout(removalTimers.current[ingredientId]);
      delete removalTimers.current[ingredientId];
    }
  };

  const clearShoppingList = () => {
    setShoppingList([]);
    // Clear all timers
    Object.values(removalTimers.current).forEach(timer => clearTimeout(timer));
    removalTimers.current = {};
  };

  const toggleIngredientChecked = (ingredientId) => {
    setShoppingList(prev => {
      return prev.map(item => {
        if (item.id === ingredientId) {
          const newChecked = !item.checked;
          // If marking as bought, start timer
          if (newChecked) {
            // Clear any existing timer first
            if (removalTimers.current[ingredientId]) {
              clearTimeout(removalTimers.current[ingredientId]);
            }
            removalTimers.current[ingredientId] = setTimeout(() => {
              setShoppingList(current => current.filter(i => i.id !== ingredientId));
              delete removalTimers.current[ingredientId];
            }, 3000);
          } else {
            // If unchecking, clear timer
            if (removalTimers.current[ingredientId]) {
              clearTimeout(removalTimers.current[ingredientId]);
              delete removalTimers.current[ingredientId];
            }
          }
          return { ...item, checked: newChecked };
        }
        return item;
      });
    });
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      Object.values(removalTimers.current).forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <ShoppingListContext.Provider value={{ 
      shoppingList, 
      addToShoppingList, 
      removeFromShoppingList, 
      clearShoppingList,
      toggleIngredientChecked
    }}>
      {children}
    </ShoppingListContext.Provider>
  );
}; 