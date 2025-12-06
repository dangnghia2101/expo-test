import { create, StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { SortOrder } from '@/types';
import { Movie, MovieCategory, SortBy } from '@/types/movie';

import { zustandStorage } from './mmkv';

interface MovieStore {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
  clearWatchlist: () => void;
  selectedCategory: MovieCategory;
  setSelectedCategory: (category: MovieCategory) => void;
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
  sortOrder: SortOrder;
  setSortOrder: (sortOrder: SortOrder) => void;
}

const initialState = {
  watchlist: [],
  selectedCategory: 'now_playing' as MovieCategory,
  sortBy: 'title' as SortBy,
  sortOrder: 'asc' as SortOrder
};

const storeCreator: StateCreator<
  MovieStore,
  [['zustand/devtools', never], ['zustand/persist', unknown]]
> = (set, get) => ({
  ...initialState,
  addToWatchlist: movie =>
    set(state => {
      const exists = state.watchlist.some(m => m.id === movie.id);
      if (exists) return {};
      return {
        watchlist: [...state.watchlist, movie]
      };
    }),
  removeFromWatchlist: movieId =>
    set(state => ({
      watchlist: state.watchlist.filter(m => m.id !== movieId)
    })),
  isInWatchlist: movieId => {
    const state = get();
    return state.watchlist.some(m => m.id === movieId);
  },
  clearWatchlist: () => set({ watchlist: [] }),
  setSelectedCategory: category => set({ selectedCategory: category }),
  setSortBy: sortBy => set({ sortBy }),
  setSortOrder: sortOrder => set({ sortOrder })
});

const useMovieStore = create<MovieStore>()(
  devtools(
    persist(storeCreator, {
      name: 'movie-storage',
      storage: createJSONStorage(() => zustandStorage)
    })
  )
);

export default useMovieStore;
