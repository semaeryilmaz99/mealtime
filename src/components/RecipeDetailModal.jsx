import React, { useState } from 'react';

const RecipeDetailModal = ({ isOpen, onClose, recipe }) => {
  const [stepIdx, setStepIdx] = useState(0);

  // Reset step index when recipe changes
  React.useEffect(() => {
    setStepIdx(0);
  }, [recipe]);

  if (!isOpen || !recipe) return null;

  const hasSteps = recipe.steps && recipe.steps.length > 0;
  const totalSteps = hasSteps ? recipe.steps.length : 0;

  const handlePrev = () => setStepIdx((idx) => Math.max(0, idx - 1));
  const handleNext = () => setStepIdx((idx) => Math.min(totalSteps - 1, idx + 1));

  return (
    <div className="fixed inset-0 glassy-modal-overlay flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="glassy-modal max-w-lg w-full p-8 relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex flex-col items-center">
          <img
            src={recipe.photo || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80'}
            alt={recipe.title}
            className="w-40 h-40 rounded-xl object-cover shadow-md border border-white/70 mb-4"
          />
          <h2 className="text-2xl font-extrabold text-blue-800 mb-2 text-center">{recipe.title}</h2>
          {recipe.ingredients && (
            <div className="w-full mb-4">
              <h3 className="font-bold text-blue-700 mb-1">Ingredients</h3>
              <ul className="list-disc list-inside text-gray-800">
                {recipe.ingredients.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {hasSteps ? (
            <div className="w-full flex flex-col items-center">
              <h3 className="font-bold text-blue-700 mb-2">Step {stepIdx + 1} of {totalSteps}</h3>
              <div className="text-gray-800 text-base mb-4 text-center min-h-[60px]">{recipe.steps[stepIdx]}</div>
              <div className="flex gap-4">
                <button
                  className="bg-blue-200 text-blue-800 px-4 py-2 rounded-lg font-semibold shadow disabled:opacity-50"
                  onClick={handlePrev}
                  disabled={stepIdx === 0}
                >
                  Previous
                </button>
                <button
                  className="bg-purple-200 text-purple-800 px-4 py-2 rounded-lg font-semibold shadow disabled:opacity-50"
                  onClick={handleNext}
                  disabled={stepIdx === totalSteps - 1}
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 text-base mb-4 text-center">{recipe.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailModal; 