# Firebase Setup Guide

This guide will help you connect your Firebase database to your React project.

## Prerequisites

1. A Firebase project created in the [Firebase Console](https://console.firebase.google.com/)
2. Firebase Firestore Database enabled
3. Your project's dependencies installed (`npm install`)

## Step 1: Get Your Firebase Configuration

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on the gear icon (⚙️) next to "Project Overview" to open Project Settings
4. Scroll down to the "Your apps" section
5. If you haven't already, click "Add app" and select the web icon (</>)
6. Register your app with a nickname
7. Copy the configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

## Step 2: Set Up Environment Variables

1. Copy the `env.example` file to `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Open `.env.local` and replace the placeholder values with your actual Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your-actual-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-actual-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-actual-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-actual-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-actual-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-actual-app-id
   VITE_FIREBASE_MEASUREMENT_ID=your-actual-measurement-id
   ```

## Step 3: Set Up Firestore Security Rules

1. In the Firebase Console, go to Firestore Database
2. Click on the "Rules" tab
3. Update the rules to allow read/write access (for development):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // WARNING: This allows anyone to read/write
    }
  }
}
```

**⚠️ Important**: The above rules allow anyone to read and write to your database. For production, you should implement proper authentication and authorization rules.

## Step 4: Test the Connection

The Firebase connection is already set up in your project. You can test it by:

1. Starting your development server:
   ```bash
   npm run dev
   ```

2. The Firebase services are available through the custom hooks:
   - `useRecipes()` - for recipe operations
   - `useShoppingList()` - for shopping list operations

## Available Firebase Services

### Recipe Services
- `addRecipe(recipeData)` - Add a new recipe
- `getAllRecipes()` - Get all recipes
- `getRecipeById(id)` - Get a specific recipe
- `updateRecipe(id, recipeData)` - Update a recipe
- `deleteRecipe(id)` - Delete a recipe
- `getRecipesByCategory(category)` - Get recipes by category

### Shopping List Services
- `addShoppingItem(itemData)` - Add item to shopping list
- `getAllShoppingItems()` - Get all shopping items
- `updateShoppingItem(id, updates)` - Update shopping item
- `deleteShoppingItem(id)` - Delete shopping item
- `clearCompletedItems()` - Clear completed items

## Usage Examples

### Using the Recipe Hook
```javascript
import { useRecipes } from '../lib/useFirebase';

function RecipeComponent() {
  const { recipes, loading, error, addRecipe, deleteRecipe } = useRecipes();

  const handleAddRecipe = async () => {
    try {
      await addRecipe({
        title: "Pasta Carbonara",
        ingredients: ["pasta", "eggs", "bacon"],
        instructions: "Cook pasta, mix with eggs and bacon",
        category: "Italian"
      });
    } catch (error) {
      console.error("Failed to add recipe:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {recipes.map(recipe => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
        </div>
      ))}
      <button onClick={handleAddRecipe}>Add Recipe</button>
    </div>
  );
}
```

### Using the Shopping List Hook
```javascript
import { useShoppingList } from '../lib/useFirebase';

function ShoppingListComponent() {
  const { items, loading, error, addItem, updateItem, deleteItem } = useShoppingList();

  const handleAddItem = async () => {
    try {
      await addItem({
        name: "Milk",
        quantity: "1 liter",
        category: "Dairy"
      });
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      await updateItem(id, { completed: !completed });
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => handleToggleComplete(item.id, item.completed)}
          />
          <span>{item.name} - {item.quantity}</span>
          <button onClick={() => deleteItem(item.id)}>Delete</button>
        </div>
      ))}
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
}
```

## Security Considerations

1. **Environment Variables**: Never commit your `.env.local` file to version control
2. **Firestore Rules**: Implement proper authentication and authorization rules for production
3. **API Keys**: While Firebase API keys are safe to expose in client-side code, always use proper security rules
4. **Data Validation**: Validate data on both client and server side

## Troubleshooting

### Common Issues

1. **"Firebase App named '[DEFAULT]' already exists"**
   - This usually happens when Firebase is initialized multiple times
   - Make sure you're only importing and initializing Firebase once

2. **"Missing or insufficient permissions"**
   - Check your Firestore security rules
   - Make sure you're authenticated if using auth-based rules

3. **Environment variables not loading**
   - Make sure your `.env.local` file is in the project root
   - Restart your development server after adding environment variables
   - Verify that variable names start with `VITE_`

4. **"Network request failed"**
   - Check your internet connection
   - Verify that your Firebase project is active
   - Check if your domain is authorized in Firebase Console

## Next Steps

1. Implement user authentication using Firebase Auth
2. Set up proper Firestore security rules
3. Add real-time listeners for live updates
4. Implement offline support with Firebase persistence
5. Add Firebase Storage for image uploads

For more information, visit the [Firebase Documentation](https://firebase.google.com/docs). 