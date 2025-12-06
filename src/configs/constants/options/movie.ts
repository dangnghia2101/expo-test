import { MOVIE_CATEGORIES, MovieCategory, SortBy } from '@/types/movie';

interface CategoryOption {
  id: MovieCategory;
  label: string;
}

interface SortOption {
  id: SortBy;
  label: string;
}

export const MOVIE_SORT_BY = {
  TITLE: 'title' as SortBy,
  VOTE_AVERAGE: 'vote_average' as SortBy,
  RELEASE_DATE: 'release_date' as SortBy
};

export const CATEGORY_MOVIE_OPTIONS: CategoryOption[] = [
  { id: MOVIE_CATEGORIES.NOW_PLAYING, label: 'Now Playing' },
  { id: MOVIE_CATEGORIES.POPULAR, label: 'Popular' },
  { id: MOVIE_CATEGORIES.UPCOMING, label: 'Upcoming' }
];

export const SORT_MOVIE_OPTIONS: SortOption[] = [
  { id: MOVIE_SORT_BY.TITLE, label: 'Alphabetical Order' },
  { id: MOVIE_SORT_BY.VOTE_AVERAGE, label: 'By Rating' },
  { id: MOVIE_SORT_BY.RELEASE_DATE, label: 'By Release Date' }
];
