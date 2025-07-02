import React, { useState, useEffect } from 'react';
import { useShoppingList } from '../context/ShoppingListContext';

const ANIMATION_DURATION = 300; // ms

const ShoppingListPage = () => {
  const { 
    shoppingList, 
    removeFromShoppingList, 
    clearShoppingList, 
    toggleIngredientChecked 
  } = useShoppingList();

  const [removingIds, setRemovingIds] = useState([]);

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

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-green-400 to-green-600 rounded-xl shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Shopping List</h1>
              <p className="text-gray-600 mt-1">Manage your grocery shopping</p>
            </div>
          </div>
          {shoppingList.length > 0 && (
            <button
              onClick={clearShoppingList}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Empty State */}
      {shoppingList.length === 0 && (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl mb-6">
              <svg className="w-20 h-20 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Your shopping list is empty</h3>
            <p className="text-gray-600 mb-4">Check ingredients from recipes to add them to your shopping list</p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Go to Recipes to start building your list</span>
            </div>
          </div>
        </div>
      )}

      {/* Shopping List Content */}
      {shoppingList.length > 0 && (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 stats-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold text-gray-800">{shoppingList.length}</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 stats-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">To Buy</p>
                  <p className="text-2xl font-bold text-orange-600">{uncheckedItems.length}</p>
                </div>
                <div className="p-2 bg-orange-100 rounded-lg">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 stats-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Bought</p>
                  <p className="text-2xl font-bold text-green-600">{checkedItems.length}</p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* To Buy Section */}
          {uncheckedItems.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  To Buy ({uncheckedItems.length})
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {uncheckedItems.map((item) => (
                                         <div 
                       key={item.id} 
                       className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 shopping-list-page-item ${
                         removingIds.includes(item.id) ? 'removing' : ''
                       }`}
                     >
                      <div className="flex items-center gap-4 flex-1">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleIngredientChecked(item.id)}
                          className="w-5 h-5 text-green-600 bg-white border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                        />
                        <div className="flex-1">
                          <span className="text-gray-800 font-medium">{item.name}</span>
                          {item.recipe && (
                            <p className="text-sm text-gray-500 mt-1">From: {item.recipe}</p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bought Section */}
          {checkedItems.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Bought ({checkedItems.length})
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {checkedItems.map((item) => (
                                         <div 
                       key={item.id} 
                       className={`flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200 shopping-list-page-item ${
                         removingIds.includes(item.id) ? 'removing' : ''
                       }`}
                     >
                      <div className="flex items-center gap-4 flex-1">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleIngredientChecked(item.id)}
                          className="w-5 h-5 text-green-600 bg-white border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                        />
                        <div className="flex-1">
                          <span className="text-gray-600 line-through font-medium">{item.name}</span>
                          {item.recipe && (
                            <p className="text-sm text-gray-500 mt-1">From: {item.recipe}</p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShoppingListPage; 