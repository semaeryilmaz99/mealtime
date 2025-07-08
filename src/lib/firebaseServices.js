import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  setDoc,
  query, 
  where, 
  orderBy
} from "firebase/firestore";
import { db } from "./firebase.js";
import { auth } from "./firebase.js";
import { storage } from './firebase.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

// Recipe services
export const recipeServices = {
  // Add a new recipe
  async addRecipe(recipeData) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");
      
      const docRef = await addDoc(collection(db, "recipes"), {
        ...recipeData,
        userId: user.uid,
        userEmail: user.email,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return { id: docRef.id, ...recipeData };
    } catch (error) {
      console.error("Error adding recipe: ", error);
      throw error;
    }
  },

  // Get all recipes for current user
  async getAllRecipes() {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");
      
      const q = query(
        collection(db, "recipes"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error getting recipes: ", error);
      throw error;
    }
  },

  // Get a single recipe by ID (for current user)
  async getRecipeById(id) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");
      
      const docRef = doc(db, "recipes", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const recipeData = docSnap.data();
        if (recipeData.userId !== user.uid) {
          throw new Error("Recipe not found");
        }
        return { id: docSnap.id, ...recipeData };
      } else {
        throw new Error("Recipe not found");
      }
    } catch (error) {
      console.error("Error getting recipe: ", error);
      throw error;
    }
  },

  // Update a recipe (for current user)
  async updateRecipe(id, recipeData) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");
      
      const docRef = doc(db, "recipes", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const existingRecipe = docSnap.data();
        if (existingRecipe.userId !== user.uid) {
          throw new Error("Recipe not found");
        }
      }
      
      await updateDoc(docRef, {
        ...recipeData,
        updatedAt: new Date()
      });
      return { id, ...recipeData };
    } catch (error) {
      console.error("Error updating recipe: ", error);
      throw error;
    }
  },

  // Delete a recipe (for current user)
  async deleteRecipe(id) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");
      
      const docRef = doc(db, "recipes", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const recipeData = docSnap.data();
        if (recipeData.userId !== user.uid) {
          throw new Error("Recipe not found");
        }
      }
      
      await deleteDoc(docRef);
      return { success: true };
    } catch (error) {
      console.error("Error deleting recipe: ", error);
      throw error;
    }
  },

  // Search recipes by category (for current user)
  async getRecipesByCategory(category) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");
      
      const q = query(
        collection(db, "recipes"), 
        where("userId", "==", user.uid),
        where("category", "==", category)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error getting recipes by category: ", error);
      throw error;
    }
    }
};

// User profile services
export const userProfileServices = {
  // Get user profile
  async getUserProfile() {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");
      
      const docRef = doc(db, "userProfiles", user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        // Return default profile if none exists
        return {
          id: user.uid,
          displayName: user.displayName || '',
          email: user.email || '',
          bio: 'Food enthusiast and home chef who loves experimenting with new recipes.',
          location: 'New York, NY',
          dietaryPreferences: ['Vegetarian', 'Gluten-Free'],
          cookingLevel: 'Intermediate',
          favoriteCuisine: 'Italian',
          joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          createdAt: new Date(),
          updatedAt: new Date()
        };
      }
    } catch (error) {
      console.error("Error getting user profile: ", error);
      throw error;
    }
  },

  // Create or update user profile
  async updateUserProfile(profileData) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");
      
      const docRef = doc(db, "userProfiles", user.uid);
      const docSnap = await getDoc(docRef);
      
      const updateData = {
        ...profileData,
        userId: user.uid,
        userEmail: user.email,
        updatedAt: new Date()
      };
      
      if (docSnap.exists()) {
        // Update existing profile
        await updateDoc(docRef, updateData);
      } else {
        // Create new profile
        await setDoc(docRef, {
          ...updateData,
          createdAt: new Date()
        });
      }
      
      return { id: user.uid, ...updateData };
    } catch (error) {
      console.error("Error updating user profile: ", error);
      throw error;
    }
  },

  async uploadProfilePhoto(file) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
      const ext = file.name.split('.').pop();
      const fileName = `profile_photos/${user.uid}/${uuidv4()}.${ext}`;
      const storageRef = ref(storage, fileName);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      // Update Firestore profile
      const docRef = doc(db, 'userProfiles', user.uid);
      await updateDoc(docRef, { photoURL: url, updatedAt: new Date() });
      return url;
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      throw error;
    }
  }
};

// Shopping list services
export const shoppingListServices = {
  // Add item to shopping list
  async addShoppingItem(itemData) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");
      
      const docRef = await addDoc(collection(db, "shoppingList"), {
        ...itemData,
        userId: user.uid,
        userEmail: user.email,
        createdAt: new Date(),
        completed: false
      });
      return { id: docRef.id, ...itemData };
    } catch (error) {
      console.error("Error adding shopping item: ", error);
      throw error;
    }
  },

  // Get all shopping list items for current user
  async getAllShoppingItems() {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");
      
      const q = query(
        collection(db, "shoppingList"), 
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error getting shopping items: ", error);
      throw error;
    }
  },

  // Update shopping item (mark as completed) for current user
  async updateShoppingItem(id, updates) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");
      
      const docRef = doc(db, "shoppingList", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const itemData = docSnap.data();
        if (itemData.userId !== user.uid) {
          throw new Error("Shopping item not found");
        }
      }
      
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date()
      });
      return { id, ...updates };
    } catch (error) {
      console.error("Error updating shopping item: ", error);
      throw error;
    }
  },

  // Delete shopping item for current user
  async deleteShoppingItem(id) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");
      
      const docRef = doc(db, "shoppingList", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const itemData = docSnap.data();
        if (itemData.userId !== user.uid) {
          throw new Error("Shopping item not found");
        }
      }
      
      await deleteDoc(docRef);
      return { success: true };
    } catch (error) {
      console.error("Error deleting shopping item: ", error);
      throw error;
    }
  },

  // Clear completed items for current user
  async clearCompletedItems() {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");
      
      const q = query(
        collection(db, "shoppingList"), 
        where("userId", "==", user.uid),
        where("completed", "==", true)
      );
      const querySnapshot = await getDocs(q);
      
      const deletePromises = querySnapshot.docs.map(doc => 
        deleteDoc(doc.ref)
      );
      
      await Promise.all(deletePromises);
      return { success: true, deletedCount: querySnapshot.docs.length };
    } catch (error) {
      console.error("Error clearing completed items: ", error);
      throw error;
    }
  }
}; 