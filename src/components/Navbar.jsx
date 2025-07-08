import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

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
              <NavLink to="/shopping-list" className={({ isActive }) =>
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 " +
                  (isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600")
                }>
                Shopping List
              </NavLink>
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

              {/* User Menu */}
              {currentUser ? (
                <div className="relative"
                     onMouseEnter={() => setUserDropdownOpen(true)}
                     onMouseLeave={() => setUserDropdownOpen(false)}>
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {(currentUser.displayName)?.[0]?.toUpperCase() || (currentUser.email?.[0]?.toUpperCase()) || 'U'}
                    </div>
                    <span className="hidden lg:block">{currentUser.displayName || currentUser.email}</span>
                    <svg className="ml-1 h-4 w-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* User Dropdown Content */}
                  <div className={`absolute right-0 mt-2 w-48 py-1 z-50 transition-all duration-200 ease-in-out ${
                    userDropdownOpen ? 'opacity-100 visible transform translate-y-0' : 'opacity-0 invisible transform -translate-y-2'
                  }`}>
                    <NavLink
                      to="/profile"
                      className="w-full text-left dropdown-item block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-150"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Profile
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left dropdown-item block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-150"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <NavLink to="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  Sign In
                </NavLink>
              )}
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
          <NavLink
            to="/shopping-list"
            className={({ isActive }) =>
              "mobile-menu-item block px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 " +
              (isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50")
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Shopping List
          </NavLink>
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

          {/* Mobile User Menu */}
          {currentUser ? (
            <div className="mobile-menu-item">
              <div className="flex items-center space-x-3 px-3 py-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {(currentUser.displayName)?.[0]?.toUpperCase() || (currentUser.email?.[0]?.toUpperCase()) || 'U'}
                </div>
                <span className="text-gray-700 text-base font-medium">{currentUser.displayName || currentUser.email}</span>
              </div>
              <NavLink
                to="/profile"
                className="mobile-menu-item text-gray-700 hover:text-blue-600 block w-full text-left px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 hover:bg-blue-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="mobile-menu-item text-red-600 hover:text-red-700 block w-full text-left px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 hover:bg-red-50"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="mobile-menu-item text-gray-700 hover:text-blue-600 block px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 hover:bg-blue-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
