# MealTime - Recipe Management App

A modern, responsive recipe management application built with React and Vite. MealTime helps you discover recipes, manage your shopping list, and plan your meals with a beautiful and intuitive interface.

## Features

### 🍳 Recipe Management
- Browse a curated collection of delicious recipes
- View detailed recipe information including ingredients and cooking steps
- Filter recipes by dietary preferences (Vegetarian, Vegan, Gluten-Free)

### 🛒 Shopping List
- **Full Shopping List Page**: Dedicated page for managing your grocery shopping list
- **Ingredient Transfer**: Check ingredients from recipes to automatically add them to your shopping list
- **Smart Organization**: Items are organized into "To Buy" and "Bought" sections
- **Auto-cleanup**: Bought items are automatically removed after 3 seconds
- **Quick Access**: Access your shopping list from the navbar, left sidebar, or right sidebar

### 📱 Responsive Design
- Fully responsive design that works on desktop, tablet, and mobile devices
- Mobile-optimized navigation with collapsible sidebars
- Touch-friendly interface for mobile users

### 🎨 Modern UI/UX
- Beautiful gradient backgrounds and smooth animations
- Intuitive navigation with active state indicators
- Hover effects and micro-interactions
- Clean, modern design with consistent styling

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mealtime
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Adding Items to Shopping List
1. Navigate to the Recipes page
2. Click on any recipe to open the recipe modal
3. Check the ingredients you want to buy
4. Items will automatically appear in your shopping list

### Managing Shopping List
- **View Full List**: Click the shopping list icon in the navbar or left sidebar
- **Mark as Bought**: Check items in your shopping list to mark them as purchased
- **Remove Items**: Click the trash icon next to any item to remove it
- **Clear All**: Use the "Clear All" button to remove all items at once

### Navigation
- **Dashboard**: Home page with app overview
- **Recipes**: Browse and view recipe details
- **Shopping List**: Full-page shopping list management
- **Left Sidebar**: Quick access to meal categories and shopping list
- **Right Sidebar**: Shopping list preview and dietary filters

## Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom animations
- **Routing**: React Router v6
- **State Management**: React Context API
- **Icons**: Heroicons (SVG)

## Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React Context providers
├── pages/              # Page components
├── assets/             # Static assets
└── index.css           # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
"# mealtime" 
