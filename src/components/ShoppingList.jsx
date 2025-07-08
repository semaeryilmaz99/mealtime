import React, { useState, useEffect } from 'react';
import { useShoppingList } from '../context/ShoppingListContext';
import { NavLink, useNavigate } from 'react-router-dom';
import PriceComparisonTable from './PriceComparisonTable';

const ANIMATION_DURATION = 300; // ms

const ShoppingList = ({ isSidebar = false }) => {
  const { 
    shoppingList, 
    removeFromShoppingList, 
    clearShoppingList, 
    toggleIngredientChecked 
  } = useShoppingList();

  const [removingIds, setRemovingIds] = useState([]);
  const navigate = useNavigate();

  // Listen for external removals (e.g., auto-remove after bought)
  useEffect(() => {
    setRemovingIds(ids => ids.filter(id => shoppingList.some(item => item.id === id)));
  }, [shoppingList]);

  // Custom remove handler with animation
  const handleRemove = (id) => {
    setRemovingIds(ids => [...ids, id]);
    setTimeout(() => {
      removeFromShoppingList(id);
    }, ANIMATION_DURATION);
  };

  const checkedItems = shoppingList.filter(item => item.checked);
  const uncheckedItems = shoppingList.filter(item => !item.checked);

  if (shoppingList.length === 0) {
    return (
      <div className="shopping-list-section">
        <div className="section-header">
          <h3 className="section-header flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
            SHOPPING LIST
          </h3>
        </div>
        <div className="empty-state">
          <div className="text-center py-8">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-500 text-sm">Your shopping list is empty</p>
            <p className="text-gray-400 text-xs mt-1">Check ingredients from recipes to add them here</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shopping-list-section">
      <div className="section-header flex flex-col items-start gap-2">
        <div className="flex items-center justify-between w-full">
          <h3 className="section-header flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
            SHOPPING LIST
            <span className="text-sm font-normal text-gray-300 ml-2">
              ({shoppingList.length})
            </span>
          </h3>
          <NavLink
            to="/shopping-list"
            className="text-white hover:text-green-300 transition-colors duration-200 p-1 rounded"
            title="View full shopping list"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </NavLink>
        </div>
        <button
          onClick={clearShoppingList}
          className="clear-all-btn-modern text-red-400 hover:text-red-600 hover:underline transition-colors duration-200 text-sm font-medium px-2 py-0.5 mt-1"
        >
          Clear all
        </button>
      </div>

      <div className="shopping-list-content">
        {/* Unchecked items */}
        {uncheckedItems.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">To Buy</h4>
            <div className="space-y-2">
              {uncheckedItems.map((item) => (
                <div key={item.id} className={`shopping-list-item${removingIds.includes(item.id) ? ' removing' : ''}`}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleIngredientChecked(item.id)}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                    />
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                      {item.name}
                    </span>
                  </label>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Checked items */}
        {checkedItems.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Bought</h4>
            <div className="space-y-2">
              {checkedItems.map((item) => (
                <div key={item.id} className={`shopping-list-item${removingIds.includes(item.id) ? ' removing' : ''}`}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleIngredientChecked(item.id)}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                    />
                    <span className="text-gray-500 line-through group-hover:text-gray-700 transition-colors duration-200">
                      {item.name}
                    </span>
                  </label>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Price Comparison Table or Button */}
        {uncheckedItems.length > 0 && (
          isSidebar ? (
            <div className="mt-4 flex justify-center">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 text-sm font-semibold"
                onClick={() => navigate('/shopping-list')}
              >
                Compare Prices
              </button>
            </div>
          ) : (
            <div className="mt-4">
              <PriceComparisonTable ingredients={uncheckedItems} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ShoppingList; 