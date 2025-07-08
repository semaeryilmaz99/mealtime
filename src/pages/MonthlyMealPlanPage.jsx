import React from 'react';
import MonthlyMealCalendar from '../components/MonthlyMealCalendar';

const MonthlyMealPlanPage = () => (
  <div className="max-w-5xl mx-auto py-8 px-4">
    <h1 className="text-3xl font-bold mb-6 text-blue-800">Monthly Meal Plan</h1>
    <MonthlyMealCalendar />
  </div>
);

export default MonthlyMealPlanPage; 