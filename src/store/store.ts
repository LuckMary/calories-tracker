import { create } from 'zustand';
import { executeDbOperation, FoodEntry, initDatabase } from '../db/database';

interface FoodState {
  foods: FoodEntry[];
  totalCalories: number;
  isInitialized: boolean;
  initDatabase: () => Promise<void>;
  addFood: (name: string, calories: number) => Promise<void>;
  removeFood: (id: number) => Promise<void>;
  updateFood: (id: number, name: string, calories: number) => Promise<void>;
  fetchFoods: () => Promise<void>;
  _ensureInitialized: () => Promise<void>;
}

export const useFoodStore = create<FoodState>((set, get) => ({
  foods: [],
  totalCalories: 0,
  isInitialized: false,
  
  initDatabase: async () => {
    try {
      await initDatabase();
      set({ isInitialized: true });
    } catch (error) {
      console.error('Database initialization failed:', error);
      throw error;
    }
  },

  _ensureInitialized: async () => {
    if (!get().isInitialized) {
      await get().initDatabase();
    }
  },
  
  addFood: async (name: string, calories: number) => {
    await get()._ensureInitialized();
    await executeDbOperation('CREATE', { name, calories });
    await get().fetchFoods();
  },

  removeFood: async (id: number) => {
    await get()._ensureInitialized();
    await executeDbOperation('DELETE', { id });
    await get().fetchFoods();
  },

  updateFood: async (id: number, name: string, calories: number) => {
    await get()._ensureInitialized();
    await executeDbOperation('UPDATE', { id, name, calories });
    await get().fetchFoods();
  },

  fetchFoods: async () => {
    await get()._ensureInitialized();
    const foods = await executeDbOperation('READ');
    const totalCalories = foods.reduce((sum: number, item: FoodEntry) => sum + item.calories, 0);
    set({ foods, totalCalories });
  }
}));