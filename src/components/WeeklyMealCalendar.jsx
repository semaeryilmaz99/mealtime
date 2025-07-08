import React, { useState } from 'react';
import '../index.css';
import MealRecipeOptionsModal from './MealRecipeOptionsModal';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const mealTypes = [
  'Breakfast',
  'Morning Snack',
  'Lunch',
  'Afternoon Snack',
  'Dinner',
  'Evening Snack',
];

const sampleMeals = {
  Mon: {
    Breakfast: 'Oatmeal',
    'Morning Snack': 'Banana',
    Lunch: 'Chicken Salad',
    'Afternoon Snack': 'Yogurt',
    Dinner: 'Spaghetti',
    'Evening Snack': 'Nuts',
  },
  Tue: {
    Breakfast: 'Pancakes',
    'Morning Snack': 'Apple',
    Lunch: 'Tuna Sandwich',
    'Afternoon Snack': 'Granola Bar',
    Dinner: 'Grilled Salmon',
    'Evening Snack': 'Berries',
  },
  Wed: {
    Breakfast: 'Eggs',
    'Morning Snack': 'Orange',
    Lunch: 'Caesar Salad',
    'Afternoon Snack': 'Carrots',
    Dinner: 'Burger',
    'Evening Snack': 'Popcorn',
  },
  Thu: {
    Breakfast: 'Smoothie',
    'Morning Snack': 'Crackers',
    Lunch: 'Soup',
    'Afternoon Snack': 'Fruit Cup',
    Dinner: 'Pizza',
    'Evening Snack': 'Dark Chocolate',
  },
  Fri: {
    Breakfast: 'Toast',
    'Morning Snack': 'Pear',
    Lunch: 'Sushi',
    'Afternoon Snack': 'Rice Cake',
    Dinner: 'Steak',
    'Evening Snack': 'Yogurt',
  },
  Sat: {
    Breakfast: 'Bagel',
    'Morning Snack': 'Grapes',
    Lunch: 'Quesadilla',
    'Afternoon Snack': 'Trail Mix',
    Dinner: 'Chicken Curry',
    'Evening Snack': 'Cookies',
  },
  Sun: {
    Breakfast: 'Waffles',
    'Morning Snack': 'Melon',
    Lunch: 'Pasta',
    'Afternoon Snack': 'Smoothie',
    Dinner: 'Roast',
    'Evening Snack': 'Ice Cream',
  },
};

// Placeholder recipe options for demo
const recipeOptionsMap = {
  Smoothie: [
    { 
      title: 'Berry Blast Smoothie', 
      description: 'Blueberries, strawberries, banana, and yogurt.', 
      photo: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
      steps: [
        'Add blueberries, strawberries, banana, and yogurt to a blender.',
        'Blend until smooth.',
        'Pour into a glass and enjoy!'
      ]
    },
    { 
      title: 'Green Detox Smoothie', 
      description: 'Spinach, apple, banana, and almond milk.', 
      photo: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80',
      steps: [
        'Add spinach, apple, banana, and almond milk to a blender.',
        'Blend until smooth and creamy.',
        'Serve immediately.'
      ]
    },
    { 
      title: 'Tropical Mango Smoothie', 
      description: 'Mango, pineapple, coconut water.', 
      photo: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
      steps: [
        'Combine mango, pineapple, and coconut water in a blender.',
        'Blend until smooth.',
        'Pour into a glass and enjoy your tropical treat!'
      ]
    },
  ],
  Oatmeal: [
    { title: 'Classic Oatmeal', description: 'Oats, milk, honey, and cinnamon.', photo: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
    { title: 'Apple Cinnamon Oatmeal', description: 'Oats, apples, cinnamon, and brown sugar.', photo: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' },
  ],
  'Chicken Salad': [
    { title: 'Classic Chicken Salad', description: 'Chicken, mayo, celery, and grapes.', photo: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' },
    { title: 'Avocado Chicken Salad', description: 'Chicken, avocado, lime, and cilantro.', photo: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
  ],
  // ...add more as needed
};

const WeeklyMealCalendar = ({ meals = sampleMeals }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState('');
  const [selectedMealName, setSelectedMealName] = useState('');

  const handleMealClick = (mealName) => {
    setSelectedMeal(mealName);
    setSelectedMealName(mealName);
    setModalOpen(true);
  };

  return (
    <div className="overflow-x-auto flex justify-center">
      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-3xl shadow-2xl p-8 w-full max-w-6xl">
        <div className="grid grid-cols-7 gap-6">
          {days.map((day) => (
            <div key={day} className="flex flex-col items-center">
              <div className="font-extrabold text-xl text-white mb-4 tracking-wide drop-shadow-lg uppercase">
                {day}
              </div>
              <div className="space-y-4 w-full">
                {mealTypes.map((type) => (
                  <div
                    key={type}
                    className={`bounce-on-hover bg-white/30 backdrop-blur-md rounded-xl px-3 py-3 text-center text-base text-blue-900 shadow-lg border border-white/30 min-h-[40px] flex flex-col items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105 ${type.includes('Snack') ? 'text-purple-700' : ''}`}
                    onClick={() => handleMealClick(meals[day]?.[type])}
                  >
                    <span className={`font-semibold mb-1 text-sm tracking-wide ${type.includes('Snack') ? 'text-purple-500' : 'text-blue-600'}`}>{type}</span>
                    <span className="text-base font-medium drop-shadow-sm">{meals[day]?.[type] || '-'}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <MealRecipeOptionsModal
        isOpen={modalOpen && !!selectedMeal}
        onClose={() => setModalOpen(false)}
        mealName={selectedMealName}
        recipeOptions={recipeOptionsMap[selectedMeal] || []}
      />
    </div>
  );
};

export default WeeklyMealCalendar; 