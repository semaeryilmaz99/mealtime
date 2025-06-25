import React, { useEffect } from 'react';

const RecipeModal = ({ recipe, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Only set overflow hidden on desktop devices (768px and above)
      if (window.innerWidth >= 768) {
        document.body.style.overflow = 'hidden';
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Only reset overflow on desktop devices
      if (window.innerWidth >= 768) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen || !recipe) return null;

  // Sample recipe data with ingredients and steps
  const recipeDetails = {
    "Classic Caesar Salad": {
      ingredients: [
        "2 heads romaine lettuce, chopped",
        "1/2 cup Caesar dressing",
        "1/4 cup grated Parmesan cheese",
        "1 cup croutons",
        "1/4 cup lemon juice",
        "2 cloves garlic, minced",
        "Salt and pepper to taste"
      ],
      steps: [
        "Wash and chop the romaine lettuce into bite-sized pieces",
        "In a large bowl, combine lettuce with Caesar dressing",
        "Add grated Parmesan cheese and croutons",
        "Toss gently to combine all ingredients",
        "Season with salt and pepper to taste",
        "Serve immediately while fresh and crisp"
      ]
    },
    "Pancakes with Berries": {
      ingredients: [
        "2 cups all-purpose flour",
        "2 tablespoons sugar",
        "2 teaspoons baking powder",
        "1/2 teaspoon salt",
        "2 eggs",
        "1 3/4 cups milk",
        "1/4 cup melted butter",
        "1 cup mixed berries",
        "Maple syrup for serving"
      ],
      steps: [
        "In a large bowl, whisk together flour, sugar, baking powder, and salt",
        "In another bowl, beat eggs, then add milk and melted butter",
        "Pour wet ingredients into dry ingredients and stir until just combined",
        "Heat a griddle or large skillet over medium heat",
        "Pour 1/4 cup batter for each pancake",
        "Cook until bubbles form on surface, then flip and cook other side",
        "Serve with fresh berries and maple syrup"
      ]
    },
    "Gourmet Burger": {
      ingredients: [
        "1 lb ground beef (80/20)",
        "4 burger buns",
        "4 slices cheddar cheese",
        "1 tomato, sliced",
        "1 red onion, sliced",
        "Lettuce leaves",
        "Salt and pepper",
        "2 tablespoons butter"
      ],
      steps: [
        "Form ground beef into 4 equal patties, about 1/2 inch thick",
        "Season both sides with salt and pepper",
        "Heat a grill or skillet over high heat",
        "Cook patties for 4-5 minutes per side for medium-rare",
        "Add cheese during last minute of cooking",
        "Toast burger buns with butter",
        "Assemble burger with lettuce, tomato, and onion",
        "Serve hot with your favorite condiments"
      ]
    },
    "Spaghetti Bolognese": {
      ingredients: [
        "1 lb spaghetti",
        "1 lb ground beef",
        "1 onion, diced",
        "3 cloves garlic, minced",
        "2 cans crushed tomatoes",
        "2 tablespoons tomato paste",
        "1/4 cup red wine",
        "1/4 cup grated Parmesan",
        "Fresh basil leaves",
        "Salt and pepper"
      ],
      steps: [
        "Cook spaghetti according to package directions",
        "In a large pan, brown ground beef over medium heat",
        "Add diced onion and cook until softened",
        "Add garlic and cook for 1 minute",
        "Stir in crushed tomatoes, tomato paste, and red wine",
        "Simmer sauce for 30 minutes, stirring occasionally",
        "Season with salt and pepper",
        "Serve sauce over spaghetti with Parmesan and basil"
      ]
    },
    "Grilled Salmon": {
      ingredients: [
        "4 salmon fillets (6 oz each)",
        "2 tablespoons olive oil",
        "2 lemons, sliced",
        "4 sprigs fresh dill",
        "2 cloves garlic, minced",
        "Salt and pepper",
        "1/4 cup white wine"
      ],
      steps: [
        "Preheat grill to medium-high heat",
        "Brush salmon with olive oil and season with salt and pepper",
        "Place lemon slices and dill on salmon",
        "Grill salmon skin-side down for 4-5 minutes",
        "Carefully flip and grill for 3-4 more minutes",
        "Add white wine to create steam and prevent sticking",
        "Cook until salmon flakes easily with a fork",
        "Serve with additional lemon wedges"
      ]
    },
    "Avocado Toast": {
      ingredients: [
        "4 slices whole grain bread",
        "2 ripe avocados",
        "1 lemon, juiced",
        "1/4 cup cherry tomatoes, halved",
        "1/4 cup microgreens",
        "Red pepper flakes",
        "Salt and pepper",
        "Extra virgin olive oil"
      ],
      steps: [
        "Toast bread until golden brown",
        "Mash avocados in a bowl with lemon juice",
        "Season avocado mixture with salt and pepper",
        "Spread mashed avocado evenly on toast",
        "Top with cherry tomatoes and microgreens",
        "Drizzle with olive oil and sprinkle with red pepper flakes",
        "Serve immediately while toast is still warm"
      ]
    },
    "Chicken Burrito": {
      ingredients: [
        "1 lb chicken breast, diced",
        "4 large flour tortillas",
        "1 cup cooked rice",
        "1 cup black beans",
        "1 cup shredded cheese",
        "1/2 cup salsa",
        "1/4 cup sour cream",
        "1 avocado, sliced",
        "Taco seasoning"
      ],
      steps: [
        "Season chicken with taco seasoning and cook until done",
        "Warm tortillas in a dry skillet",
        "Layer rice, beans, and chicken on each tortilla",
        "Add cheese, salsa, and sour cream",
        "Top with avocado slices",
        "Fold sides of tortilla and roll tightly",
        "Optional: grill burrito for crispy exterior",
        "Serve with additional salsa and sour cream"
      ]
    },
    "Margherita Pizza": {
      ingredients: [
        "1 pizza dough",
        "1/2 cup tomato sauce",
        "8 oz fresh mozzarella, sliced",
        "1/4 cup fresh basil leaves",
        "2 tablespoons olive oil",
        "2 cloves garlic, minced",
        "Salt and pepper"
      ],
      steps: [
        "Preheat oven to 500°F with pizza stone if available",
        "Roll out pizza dough on floured surface",
        "Spread tomato sauce evenly over dough",
        "Arrange mozzarella slices on top",
        "Drizzle with olive oil and minced garlic",
        "Bake for 12-15 minutes until crust is golden",
        "Remove from oven and add fresh basil",
        "Let rest for 2 minutes before slicing"
      ]
    },
    "Chocolate Lava Cake": {
      ingredients: [
        "4 oz dark chocolate",
        "1/2 cup butter",
        "2 eggs",
        "2 egg yolks",
        "1/4 cup sugar",
        "1/4 cup flour",
        "1/4 teaspoon salt",
        "Butter for ramekins"
      ],
      steps: [
        "Preheat oven to 425°F and butter 4 ramekins",
        "Melt chocolate and butter together",
        "Whisk eggs, egg yolks, and sugar until pale",
        "Fold chocolate mixture into egg mixture",
        "Gently fold in flour and salt",
        "Divide batter among ramekins",
        "Bake for 12-14 minutes until edges are set",
        "Invert onto plates and serve immediately"
      ]
    }
  };

  const details = recipeDetails[recipe.title] || {
    ingredients: ["Ingredients not available"],
    steps: ["Recipe steps not available"]
  };

  return (
    <div className="fixed inset-0 z-40 md:z-50 flex items-center justify-center p-2 md:top-16 md:left-64 md:right-80 md:bottom-0 md:p-4">
      {/* Glassmorphism overlay */}
      <div 
        className="absolute inset-0 bg-white/30 backdrop-blur-xl"
        onClick={onClose}
      ></div>
      {/* Modal content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] md:max-h-[calc(100vh-8rem)] overflow-hidden z-40 md:z-50">
        {/* Header */}
        <div className="relative h-64 md:h-80">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{recipe.title}</h2>
            <div className="flex items-center gap-4">
              {recipe.diet !== 'None' && (
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  {recipe.diet}
                </span>
              )}
              <span className="flex items-center gap-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {recipe.time} min
              </span>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(85vh-320px)] md:max-h-[calc(100vh-8rem-320px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ingredients */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Ingredients
              </h3>
              <ul className="space-y-3">
                {details.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Steps */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Instructions
              </h3>
              <ol className="space-y-4">
                {details.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-700 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal; 