import React, { useState } from 'react';
import MealRecipeOptionsModal from './MealRecipeOptionsModal';

const getMonthDays = (year, month) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

// Sample daily meals for demo (same as WeeklyMealCalendar)
const sampleMeals = {};
for (let i = 1; i <= 31; i++) {
  sampleMeals[i] = {
    Breakfast: `Breakfast ${i}`,
    'Morning Snack': `Morning Snack ${i}`,
    Lunch: `Lunch ${i}`,
    'Afternoon Snack': `Afternoon Snack ${i}`,
    Dinner: `Dinner ${i}`,
    'Evening Snack': `Evening Snack ${i}`,
  };
}

const MonthlyMealCalendar = ({ year = new Date().getFullYear(), month = new Date().getMonth(), meals = sampleMeals }) => {
  const days = getMonthDays(year, month);
  const firstDay = new Date(year, month, 1).getDay();
  const blanks = Array((firstDay + 6) % 7).fill(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDayMeals, setSelectedDayMeals] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (dateNum) => {
    setSelectedDayMeals(meals[dateNum]);
    setSelectedDate(dateNum);
    setModalOpen(true);
  };

  return (
    <div className="overflow-x-auto flex justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="grid grid-cols-7 gap-4">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d} className="text-center font-bold text-blue-700 mb-2 text-lg">{d}</div>
          ))}
          {blanks.map((_, idx) => (
            <div key={"blank-" + idx}></div>
          ))}
          {days.map((date) => (
            <div
              key={date.getDate()}
              className="bg-blue-50 rounded-xl p-4 min-h-[70px] flex flex-col items-center border border-blue-100 shadow-sm cursor-pointer hover:bg-blue-100 hover:shadow-lg transition-all duration-200"
              onClick={() => handleDateClick(date.getDate())}
            >
              <div className="font-semibold text-blue-900 mb-1 text-lg">{date.getDate()}</div>
              <div className="text-base text-blue-500 text-center font-medium">{meals[date.getDate()]?.Breakfast || '-'}</div>
            </div>
          ))}
        </div>
      </div>
      <MealRecipeOptionsModal
        isOpen={modalOpen && !!selectedDayMeals}
        onClose={() => setModalOpen(false)}
        mealName={`Meals for Day ${selectedDate}`}
        dailyMeals={selectedDayMeals}
      />
    </div>
  );
};

export default MonthlyMealCalendar; 