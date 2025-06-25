import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbar = document.querySelector('.navbar-container');
      
      if (mobileMenuOpen && navbar && !navbar.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 fixed top-0 left-0 right-0 z-[999] md:z-50 navbar-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <NavLink to="/">
                <img
                  src="/logo.png"
                  alt="MealTime Logo"
                  className="h-8 w-auto"
                />
              </NavLink>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLink to="/" className={({ isActive }) =>
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 " +
                  (isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600")
                }>
                Dashboard
              </NavLink>
              <NavLink to="/recipes" className={({ isActive }) =>
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 " +
                  (isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600")
                }>
                Recipes
              </NavLink>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Shopping List
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Favorites
              </a>
              
              {/* Dropdown Menu */}
              <div className="relative"
                   onMouseEnter={() => setDropdownOpen(true)}
                   onMouseLeave={() => setDropdownOpen(false)}>
                <button className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center">
                  Personal Meal Plan
                  <svg className="ml-1 h-4 w-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Content */}
                <div className={`dropdown-content absolute right-0 mt-2 w-48 py-1 z-50 transition-all duration-200 ease-in-out ${
                  dropdownOpen ? 'opacity-100 visible transform translate-y-0' : 'opacity-0 invisible transform -translate-y-2'
                }`}>
                  <a href="#" className="dropdown-item block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-150">
                    Weekly Meal Plan
                  </a>
                  <a href="#" className="dropdown-item block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-150">
                    Monthly Meal Plan
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hamburger-button inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu md:hidden ${mobileMenuOpen ? 'open' : 'closed'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              "mobile-menu-item block px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 " +
              (isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50")
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/recipes"
            className={({ isActive }) =>
              "mobile-menu-item block px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 " +
              (isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50")
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Recipes
          </NavLink>
          <a
            href="#"
            className="mobile-menu-item text-gray-700 hover:text-blue-600 block px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 hover:bg-blue-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            Shopping List
          </a>
          <a 
            href="#" 
            className="mobile-menu-item text-gray-700 hover:text-blue-600 block px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 hover:bg-blue-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            Favorites
          </a>
          
          {/* Mobile Dropdown */}
          <div className="mobile-menu-item mobile-dropdown">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-gray-700 hover:text-blue-600 block w-full text-left px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 flex items-center justify-between hover:bg-blue-50"
            >
              Personal Meal Plan
              <svg className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
              dropdownOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <a 
                href="#" 
                className="mobile-dropdown-item block px-6 py-2 text-sm text-gray-600 hover:text-blue-600 transition-all duration-200 hover:bg-blue-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Weekly Meal Plan
              </a>
              <a 
                href="#" 
                className="mobile-dropdown-item block px-6 py-2 text-sm text-gray-600 hover:text-blue-600 transition-all duration-200 hover:bg-blue-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Monthly Meal Plan
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
