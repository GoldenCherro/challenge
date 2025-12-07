import { filterMovies, sortMovies, getUniqueGenres, getUniqueDirectors } from '../utils';
import { Movie, FilterState, SortState } from '../types';

const mockMovies: Movie[] = [
  {
    Title: 'Inception',
    Year: '2010',
    Rated: 'PG-13',
    Released: '16 Jul 2010',
    Runtime: '148 min',
    Genre: 'Action, Sci-Fi, Thriller',
    Director: 'Christopher Nolan',
    Writer: 'Christopher Nolan',
    Actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt',
  },
  {
    Title: 'The Dark Knight',
    Year: '2008',
    Rated: 'PG-13',
    Released: '18 Jul 2008',
    Runtime: '152 min',
    Genre: 'Action, Crime, Drama',
    Director: 'Christopher Nolan',
    Writer: 'Jonathan Nolan',
    Actors: 'Christian Bale, Heath Ledger',
  },
  {
    Title: 'Interstellar',
    Year: '2014',
    Rated: 'PG-13',
    Released: '07 Nov 2014',
    Runtime: '169 min',
    Genre: 'Adventure, Drama, Sci-Fi',
    Director: 'Christopher Nolan',
    Writer: 'Jonathan Nolan',
    Actors: 'Matthew McConaughey, Anne Hathaway',
  },
  {
    Title: 'Pulp Fiction',
    Year: '1994',
    Rated: 'R',
    Released: '14 Oct 1994',
    Runtime: '154 min',
    Genre: 'Crime, Drama',
    Director: 'Quentin Tarantino',
    Writer: 'Quentin Tarantino',
    Actors: 'John Travolta, Uma Thurman',
  },
];

describe('Utils - Filtering (Complex)', () => {
  it('filters by search term in title', () => {
    const filters: FilterState = {
      search: 'dark',
      genres: [],
      yearRange: [2000, 2024],
      ratings: [],
      directors: [],
    };

    const result = filterMovies(mockMovies, filters);
    expect(result).toHaveLength(1);
    expect(result[0].Title).toBe('The Dark Knight');
  });

  it('filters by search term in actors', () => {
    const filters: FilterState = {
      search: 'leonardo',
      genres: [],
      yearRange: [2000, 2024],
      ratings: [],
      directors: [],
    };

    const result = filterMovies(mockMovies, filters);
    expect(result).toHaveLength(1);
    expect(result[0].Title).toBe('Inception');
  });

  it('filters by single genre', () => {
    const filters: FilterState = {
      search: '',
      genres: ['Sci-Fi'],
      yearRange: [2000, 2024],
      ratings: [],
      directors: [],
    };

    const result = filterMovies(mockMovies, filters);
    expect(result).toHaveLength(2);
    expect(result.map((m) => m.Title)).toContain('Inception');
    expect(result.map((m) => m.Title)).toContain('Interstellar');
  });

  it('filters by multiple genres (AND logic)', () => {
    const filters: FilterState = {
      search: '',
      genres: ['Action', 'Sci-Fi'],
      yearRange: [2000, 2024],
      ratings: [],
      directors: [],
    };

    const result = filterMovies(mockMovies, filters);
    expect(result).toHaveLength(1);
    expect(result[0].Title).toBe('Inception');
  });

  it('filters by year range', () => {
    const filters: FilterState = {
      search: '',
      genres: [],
      yearRange: [2010, 2015],
      ratings: [],
      directors: [],
    };

    const result = filterMovies(mockMovies, filters);
    expect(result).toHaveLength(2);
    expect(result.map((m) => m.Title)).toContain('Inception');
    expect(result.map((m) => m.Title)).toContain('Interstellar');
  });

  it('filters by rating', () => {
    const filters: FilterState = {
      search: '',
      genres: [],
      yearRange: [1990, 2024],
      ratings: ['R'],
      directors: [],
    };

    const result = filterMovies(mockMovies, filters);
    expect(result).toHaveLength(1);
    expect(result[0].Title).toBe('Pulp Fiction');
  });

  it('filters by director', () => {
    const filters: FilterState = {
      search: '',
      genres: [],
      yearRange: [1990, 2024],
      ratings: [],
      directors: ['Quentin Tarantino'],
    };

    const result = filterMovies(mockMovies, filters);
    expect(result).toHaveLength(1);
    expect(result[0].Title).toBe('Pulp Fiction');
  });

  it('combines multiple filters (AND logic)', () => {
    const filters: FilterState = {
      search: '',
      genres: ['Action'],
      yearRange: [2010, 2015],
      ratings: ['PG-13'],
      directors: ['Christopher Nolan'],
    };

    const result = filterMovies(mockMovies, filters);
    expect(result).toHaveLength(1);
    expect(result[0].Title).toBe('Inception');
  });

  it('returns empty array when no matches', () => {
    const filters: FilterState = {
      search: 'nonexistent',
      genres: [],
      yearRange: [2000, 2024],
      ratings: [],
      directors: [],
    };

    const result = filterMovies(mockMovies, filters);
    expect(result).toHaveLength(0);
  });
});

describe('Utils - Sorting', () => {
  it('sorts by year ascending', () => {
    const sort: SortState = { field: 'Year', direction: 'asc' };
    const result = sortMovies(mockMovies, sort);

    expect(result[0].Year).toBe('1994');
    expect(result[result.length - 1].Year).toBe('2014');
  });

  it('sorts by year descending', () => {
    const sort: SortState = { field: 'Year', direction: 'desc' };
    const result = sortMovies(mockMovies, sort);

    expect(result[0].Year).toBe('2014');
    expect(result[result.length - 1].Year).toBe('1994');
  });

  it('sorts by title ascending', () => {
    const sort: SortState = { field: 'Title', direction: 'asc' };
    const result = sortMovies(mockMovies, sort);

    expect(result[0].Title).toBe('Inception');
    expect(result[result.length - 1].Title).toBe('The Dark Knight');
  });

  it('sorts by title descending', () => {
    const sort: SortState = { field: 'Title', direction: 'desc' };
    const result = sortMovies(mockMovies, sort);

    expect(result[0].Title).toBe('The Dark Knight');
    expect(result[result.length - 1].Title).toBe('Inception');
  });
});

describe('Utils - Helpers', () => {
  it('extracts unique genres', () => {
    const genres = getUniqueGenres(mockMovies);
    expect(genres).toContain('Action');
    expect(genres).toContain('Sci-Fi');
    expect(genres).toContain('Drama');
    expect(genres).toContain('Crime');
  });

  it('extracts unique directors', () => {
    const directors = getUniqueDirectors(mockMovies);
    expect(directors).toContain('Christopher Nolan');
    expect(directors).toContain('Quentin Tarantino');
  });
});
