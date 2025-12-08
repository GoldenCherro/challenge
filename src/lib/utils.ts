import { clsx, type ClassValue } from 'clsx';
import { Movie, FilterState, SortState } from './types';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function filterMovies(movies: Movie[], filters: FilterState): Movie[] {
  return movies.filter((movie) => {
    // Search filter (Title or Actors)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        movie.Title.toLowerCase().includes(searchLower) ||
        movie.Actors.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Genre filter (AND logic - movie must have ALL selected genres)
    if (filters.genres.length > 0) {
      const movieGenres = movie.Genre.split(',').map((g) => g.trim());
      const hasAllGenres = filters.genres.every((filterGenre) =>
        movieGenres.includes(filterGenre)
      );
      if (!hasAllGenres) return false;
    }

    // Year range filter
    const movieYear = parseInt(movie.Year);
    if (movieYear < filters.yearRange[0] || movieYear > filters.yearRange[1]) {
      return false;
    }

    // Rating filter
    if (filters.ratings.length > 0) {
      if (!filters.ratings.includes(movie.Rated)) return false;
    }

    // Director filter
    if (filters.directors.length > 0) {
      const movieDirectors = movie.Director.split(',').map((d) => d.trim());
      const hasDirector = filters.directors.some((filterDirector) =>
        movieDirectors.includes(filterDirector)
      );
      if (!hasDirector) return false;
    }

    return true;
  });
}

export function sortMovies(movies: Movie[], sort: SortState): Movie[] {
  const sorted = [...movies];

  sorted.sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    if (sort.field === 'Year') {
      aValue = parseInt(a.Year);
      bValue = parseInt(b.Year);
    } else if (sort.field === 'Title') {
      aValue = a.Title.toLowerCase();
      bValue = b.Title.toLowerCase();
    } else {
      // Rated
      const ratingOrder = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'NR', 'Not Rated'];
      aValue = ratingOrder.indexOf(a.Rated);
      bValue = ratingOrder.indexOf(b.Rated);
      if (aValue === -1) aValue = 999;
      if (bValue === -1) bValue = 999;
    }

    if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
}

export function getUniqueGenres(movies: Movie[]): string[] {
  const genresSet = new Set<string>();
  movies.forEach((movie) => {
    movie.Genre.split(',').forEach((genre) => {
      genresSet.add(genre.trim());
    });
  });
  return Array.from(genresSet).sort();
}

export function getUniqueDirectors(movies: Movie[]): string[] {
  const directorsSet = new Set<string>();
  movies.forEach((movie) => {
    movie.Director.split(',').forEach((director) => {
      directorsSet.add(director.trim());
    });
  });
  return Array.from(directorsSet).sort();
}

export function getUniqueRatings(movies: Movie[]): string[] {
  const ratingsSet = new Set<string>();
  movies.forEach((movie) => {
    ratingsSet.add(movie.Rated);
  });
  return Array.from(ratingsSet).sort();
}

export function getYearRange(movies: Movie[]): [number, number] {
  if (movies.length === 0) return [2010, new Date().getFullYear()];

  const years = movies.map((m) => parseInt(m.Year)).filter((y) => !isNaN(y));
  return [Math.min(...years), Math.max(...years)];
}
