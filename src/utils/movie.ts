import { TMDB_IMAGE_BASE_URL, SORT_ORDER } from '@/configs/constants';
import { MOVIE_SORT_BY } from '@/configs/constants/options/movie';
import { SortOrder } from '@/types';
import { Movie, SortBy } from '@/types/movie';

export const getImageUrl = (
  path: string | null,
  size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'
): string => {
  if (!path) return '';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getPosterUrl = (path: string | null): string => {
  return getImageUrl(path, 'w500');
};

export const getBackdropUrl = (path: string | null): string => {
  return getImageUrl(path, 'w780');
};

export const getProfileUrl = (path: string | null): string => {
  return getImageUrl(path, 'w185');
};

export const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const formatVoteAverage = (vote: number): string => {
  return (vote * 10).toFixed(0);
};

export const sortMovies = (
  movies: Movie[],
  sortBy: SortBy,
  sortOrder: SortOrder
): Movie[] => {
  const sorted = [...movies].sort((a, b) => {
    switch (sortBy) {
      case MOVIE_SORT_BY.TITLE:
        return a.title.localeCompare(b.title);
      case MOVIE_SORT_BY.VOTE_AVERAGE:
        return b.vote_average - a.vote_average;
      case MOVIE_SORT_BY.RELEASE_DATE:
        return (
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
        );
      default:
        return 0;
    }
  });

  return sortOrder === SORT_ORDER.DESC ? sorted.reverse() : sorted;
};
