import React from 'react';
import WeeklyMealCalendar from '../components/WeeklyMealCalendar';

const WeeklyMealPlanPage = () => (
  <div className="max-w-5xl mx-auto py-8 px-4">
    <h1 className="text-3xl font-bold mb-6 text-blue-800">Weekly Meal Plan</h1>
    <WeeklyMealCalendar />
  </div>
);

export default WeeklyMealPlanPage; 