import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ShoppingList from './ShoppingList'

const RightSidebar = () => {
  const [selectedDiet, setSelectedDiet] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
    { id: 'vegan', label: 'Vegan', icon: '🌱' },
    { id: 'gluten-free', label: 'Gluten Free', icon: '🌾' }
  ]

  const handleDietClick = (dietId) => {
    setSelectedDiet(selectedDiet === dietId ? null : dietId)
  }

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="right-sidebar hidden md:block">
        <div className="sidebar-content">
          {/* Shopping List Section */}
          <div className="mb-8">
            <ShoppingList isSidebar={true} />
          </div>
          
          <div className="dietary-section">
            <h3 className="section-header">Dietary</h3>
            <div className="dietary-options">
              {dietaryOptions.map((option) => (
                <div
                  key={option.id}
                  className={`dietary-option ${selectedDiet === option.id ? 'selected' : ''}`}
                  onClick={() => handleDietClick(option.id)}
                >
                  <span className="option-icon">{option.icon}</span>
                  <span className="option-label">{option.label}</span>
                  <div className="option-indicator">
                    <div className="indicator-dot"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`mobile-right-sidebar ${mobileOpen ? 'open' : ''}`}>
        {/* Close Button - Top Right Corner */}
        <button
          onClick={toggleMobile}
          className="absolute top-4 right-4 p-2 text-white hover:text-gray-200 transition-colors duration-200 z-10"
          aria-label="Close sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="sidebar-content">
          {/* Shopping List Section */}
          <div className="mb-8">
            <ShoppingList isSidebar={true} />
          </div>
          
          <div className="dietary-section">
            <h3 className="section-header">Dietary</h3>
            <div className="dietary-options">
              {dietaryOptions.map((option) => (
                <div
                  key={option.id}
                  className={`dietary-option ${selectedDiet === option.id ? 'selected' : ''}`}
                  onClick={() => {
                    handleDietClick(option.id)
                    setMobileOpen(false)
                  }}
                >
                  <span className="option-icon">{option.icon}</span>
                  <span className="option-label">{option.label}</span>
                  <div className="option-indicator">
                    <div className="indicator-dot"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobile}
        className="mobile-toggle-right md:hidden"
        aria-label="Toggle dietary options"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={toggleMobile}
      ></div>
    </>
  )
}

export default RightSidebar
