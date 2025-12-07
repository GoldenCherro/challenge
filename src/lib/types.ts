export interface Movie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
}

export interface MoviesResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Movie[];
}

export interface FilterState {
  search: string;
  genres: string[];
  yearRange: [number, number];
  ratings: string[];
  directors: string[];
}

export type SortField = 'Year' | 'Title' | 'Rated';
export type SortDirection = 'asc' | 'desc';

export interface SortState {
  field: SortField;
  direction: SortDirection;
}
