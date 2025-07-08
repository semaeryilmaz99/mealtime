import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import RecipesPage from './pages/RecipesPage.jsx'
import ShoppingListPage from './pages/ShoppingListPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { AuthProvider } from './context/AuthContext'
import WeeklyMealPlanPage from './pages/WeeklyMealPlanPage.jsx';
import MonthlyMealPlanPage from './pages/MonthlyMealPlanPage.jsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/recipes',
        element: (
          <ProtectedRoute>
            <RecipesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/shopping-list',
        element: (
          <ProtectedRoute>
            <ShoppingListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/weekly-meal-plan',
        element: (
          <ProtectedRoute>
            <WeeklyMealPlanPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/monthly-meal-plan',
        element: (
          <ProtectedRoute>
            <MonthlyMealPlanPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
