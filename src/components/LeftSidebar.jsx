import React, { useState } from 'react';

const LeftSidebar = () => {
  const [activeItem, setActiveItem] = useState('breakfast');

  const menuItems = [
    {
      id: 'breakfast',
      name: 'Breakfast',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      id: 'lunch',
      name: 'Lunch',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'dinner',
      name: 'Dinner',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )
    },
    {
      id: 'desserts',
      name: 'Desserts',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="fixed left-0 top-16 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-40">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 px-2">Meal Categories</h2>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                activeItem === item.id
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className={`transition-colors duration-200 ${
                activeItem === item.id ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
              }`}>
                {item.icon}
              </div>
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default LeftSidebar;
