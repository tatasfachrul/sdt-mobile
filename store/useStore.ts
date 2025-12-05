import { Owner } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AppState {
  favorites: string[];
  masterId: string | null;
  masterData: Owner | null;
  toggleFavorite: (id: string) => void;
  setMasterId: (id: string) => void;
  setMasterData: (data: Owner) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      favorites: [],
      masterId: null,
      masterData: null,
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((fav) => fav !== id)
            : [...state.favorites, id],
        })),
      setMasterId: (id) => set({ masterId: id }),
      setMasterData: (data) => set({ masterData: data }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
