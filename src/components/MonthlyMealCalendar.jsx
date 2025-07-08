import React from 'react';

const getMonthDays = (year, month) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const mealData = {};
// Fill with placeholder meals for demo
for (let i = 1; i <= 31; i++) {
  mealData[i] = `Meal ${i}`;
}

const MonthlyMealCalendar = ({ year = new Date().getFullYear(), month = new Date().getMonth(), meals = mealData }) => {
  const days = getMonthDays(year, month);
  const firstDay = new Date(year, month, 1).getDay();
  const blanks = Array((firstDay + 6) % 7).fill(null); // Adjust for Mon-Sun

  return (
    <div className="overflow-x-auto">
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="grid grid-cols-7 gap-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d} className="text-center font-bold text-blue-700 mb-2">{d}</div>
          ))}
          {blanks.map((_, idx) => (
            <div key={"blank-" + idx}></div>
          ))}
          {days.map((date) => (
            <div key={date.getDate()} className="bg-blue-50 rounded-lg p-2 min-h-[60px] flex flex-col items-center border border-blue-100 shadow-sm">
              <div className="font-semibold text-blue-900 mb-1">{date.getDate()}</div>
              <div className="text-xs text-blue-500 text-center">{meals[date.getDate()] || '-'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthlyMealCalendar; 