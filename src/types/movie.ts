import { SortOrder } from './request';

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;
  original_title: string;
  adult: boolean;
  video: boolean;
  genre_ids?: number[];
}

export interface MovieDetails extends Movie {
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  homepage: string;
  imdb_id: string;
  genres: Genre[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
  english_name: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  cast_id: number;
  credit_id: string;
  gender: number;
  known_for_department: string;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
  credit_id: string;
  gender: number;
}

export interface Credits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const MOVIE_CATEGORIES = {
  NOW_PLAYING: 'now_playing',
  POPULAR: 'popular',
  UPCOMING: 'upcoming'
} as const;

export const SORT_BY_OPTIONS = {
  TITLE: 'title',
  VOTE_AVERAGE: 'vote_average',
  RELEASE_DATE: 'release_date'
} as const;

export type MovieCategory =
  (typeof MOVIE_CATEGORIES)[keyof typeof MOVIE_CATEGORIES];
export type SortBy = (typeof SORT_BY_OPTIONS)[keyof typeof SORT_BY_OPTIONS];

export interface MovieFilters {
  category: MovieCategory;
  search: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
}
