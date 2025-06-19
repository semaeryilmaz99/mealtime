import React, { useState } from 'react'

const RightSidebar = () => {
  const [selectedDiet, setSelectedDiet] = useState(null)

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
    { id: 'vegan', label: 'Vegan', icon: '🌱' },
    { id: 'gluten-free', label: 'Gluten Free', icon: '🌾' }
  ]

  const handleDietClick = (dietId) => {
    setSelectedDiet(selectedDiet === dietId ? null : dietId)
  }

  return (
    <div className="right-sidebar">
      <div className="sidebar-content">
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
  )
}

export default RightSidebar
