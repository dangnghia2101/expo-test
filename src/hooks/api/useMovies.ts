import { useMemo, useState } from 'react';

import { API, SORT_ORDER } from '@/configs/constants';
import useMovieStore from '@/store/useMovieStore';
import {
  Movie,
  MOVIE_CATEGORIES,
  MovieCategory,
  MovieListResponse
} from '@/types/movie';
import { sortMovies } from '@/utils/movie';

import { useBaseInfinite } from '../useBaseInfinite';

export const useMovieList = () => {
  const { selectedCategory, setSelectedCategory, sortBy, setSortBy } =
    useMovieStore();
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const getEndpoint = () => {
    if (searchQuery) {
      return API.MOVIE.SEARCH;
    }
    switch (selectedCategory) {
      case MOVIE_CATEGORIES.NOW_PLAYING:
        return API.MOVIE.NOW_PLAYING;
      case MOVIE_CATEGORIES.POPULAR:
        return API.MOVIE.POPULAR;
      case MOVIE_CATEGORIES.UPCOMING:
        return API.MOVIE.UPCOMING;
      default:
        return API.MOVIE.NOW_PLAYING;
    }
  };

  const endpoint = getEndpoint();
  const params: Record<string, string | number> = {};

  if (searchQuery) {
    params.query = searchQuery;
  }

  const result = useBaseInfinite<MovieListResponse>({
    key: [endpoint, searchQuery],
    uri: endpoint,
    params
  });

  const sortedData = useMemo(() => {
    if (!result.data || result.data.length === 0) {
      return [];
    }
    return sortMovies(
      result.data as unknown as Movie[],
      sortBy,
      SORT_ORDER.ASC
    );
  }, [result.data, sortBy]);

  const handleCategoryChange = (category: MovieCategory) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setSearchText('');
  };

  const handleSearch = () => {
    setSearchQuery(searchText.trim());
  };

  return {
    ...result,
    data: sortedData,
    selectedCategory,
    setSelectedCategory: handleCategoryChange,
    sortBy,
    setSortBy,
    searchText,
    setSearchText,
    handleSearch
  };
};
