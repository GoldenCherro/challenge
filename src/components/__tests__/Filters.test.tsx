import { render, screen, fireEvent } from '@testing-library/react';
import { Filters } from '../Filters';
import { FilterState, Movie } from '@/lib/types';

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
    Actors: 'Leonardo DiCaprio',
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
    Actors: 'Christian Bale',
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
    Actors: 'Matthew McConaughey',
  },
];

const initialFilters: FilterState = {
  search: '',
  genres: [],
  yearRange: [2010, 2024],
  ratings: [],
  directors: [],
};

describe('Filters (Complex)', () => {
  const mockOnFiltersChange = jest.fn();
  const mockOnClearFilters = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders filter sections', () => {
    render(
      <Filters
        filters={initialFilters}
        onFiltersChange={mockOnFiltersChange}
        allMovies={mockMovies}
        resultCount={3}
        onClearFilters={mockOnClearFilters}
        hasActiveFilters={false}
      />
    );

    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('3 results')).toBeInTheDocument();
  });

  it('handles genre selection', () => {
    render(
      <Filters
        filters={initialFilters}
        onFiltersChange={mockOnFiltersChange}
        allMovies={mockMovies}
        resultCount={3}
        onClearFilters={mockOnClearFilters}
        hasActiveFilters={false}
      />
    );

    const actionButton = screen.getByRole('button', { name: 'Action' });
    fireEvent.click(actionButton);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...initialFilters,
      genres: ['Action'],
    });
  });

  it('handles multiple genre selections (AND logic)', () => {
    const filtersWithOneGenre: FilterState = {
      ...initialFilters,
      genres: ['Action'],
    };

    render(
      <Filters
        filters={filtersWithOneGenre}
        onFiltersChange={mockOnFiltersChange}
        allMovies={mockMovies}
        resultCount={2}
        onClearFilters={mockOnClearFilters}
        hasActiveFilters={true}
      />
    );

    const sciFiButton = screen.getByRole('button', { name: 'Sci-Fi' });
    fireEvent.click(sciFiButton);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...filtersWithOneGenre,
      genres: ['Action', 'Sci-Fi'],
    });
  });

  it('handles genre deselection', () => {
    const filtersWithGenres: FilterState = {
      ...initialFilters,
      genres: ['Action', 'Sci-Fi'],
    };

    render(
      <Filters
        filters={filtersWithGenres}
        onFiltersChange={mockOnFiltersChange}
        allMovies={mockMovies}
        resultCount={1}
        onClearFilters={mockOnClearFilters}
        hasActiveFilters={true}
      />
    );

    const actionButton = screen.getByRole('button', { name: 'Action' });
    fireEvent.click(actionButton);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...filtersWithGenres,
      genres: ['Sci-Fi'],
    });
  });

  it('handles rating selection', () => {
    render(
      <Filters
        filters={initialFilters}
        onFiltersChange={mockOnFiltersChange}
        allMovies={mockMovies}
        resultCount={3}
        onClearFilters={mockOnClearFilters}
        hasActiveFilters={false}
      />
    );

    const pg13Button = screen.getByRole('button', { name: 'PG-13' });
    fireEvent.click(pg13Button);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...initialFilters,
      ratings: ['PG-13'],
    });
  });

  it('handles director selection', () => {
    render(
      <Filters
        filters={initialFilters}
        onFiltersChange={mockOnFiltersChange}
        allMovies={mockMovies}
        resultCount={3}
        onClearFilters={mockOnClearFilters}
        hasActiveFilters={false}
      />
    );

    const nolanButton = screen.getByRole('button', { name: 'Christopher Nolan' });
    fireEvent.click(nolanButton);

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...initialFilters,
      directors: ['Christopher Nolan'],
    });
  });

  it('handles year range changes', () => {
    render(
      <Filters
        filters={initialFilters}
        onFiltersChange={mockOnFiltersChange}
        allMovies={mockMovies}
        resultCount={3}
        onClearFilters={mockOnClearFilters}
        hasActiveFilters={false}
      />
    );

    const yearInputs = screen.getAllByRole('spinbutton');
    const minYearInput = yearInputs[0];

    fireEvent.change(minYearInput, { target: { value: '2012' } });

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...initialFilters,
      yearRange: [2012, 2024],
    });
  });

  it('displays active filters', () => {
    const activeFilters: FilterState = {
      search: '',
      genres: ['Action', 'Sci-Fi'],
      yearRange: [2010, 2024],
      ratings: ['PG-13'],
      directors: ['Christopher Nolan'],
    };

    render(
      <Filters
        filters={activeFilters}
        onFiltersChange={mockOnFiltersChange}
        allMovies={mockMovies}
        resultCount={1}
        onClearFilters={mockOnClearFilters}
        hasActiveFilters={true}
      />
    );

    expect(screen.getByText('Active Filters')).toBeInTheDocument();
    expect(screen.getByText('Clear all')).toBeInTheDocument();
  });

  it('calls clear filters when clicking clear all', () => {
    const activeFilters: FilterState = {
      ...initialFilters,
      genres: ['Action'],
    };

    render(
      <Filters
        filters={activeFilters}
        onFiltersChange={mockOnFiltersChange}
        allMovies={mockMovies}
        resultCount={2}
        onClearFilters={mockOnClearFilters}
        hasActiveFilters={true}
      />
    );

    const clearButton = screen.getByText('Clear all');
    fireEvent.click(clearButton);

    expect(mockOnClearFilters).toHaveBeenCalled();
  });

  it('toggles filter panel expansion', () => {
    render(
      <Filters
        filters={initialFilters}
        onFiltersChange={mockOnFiltersChange}
        allMovies={mockMovies}
        resultCount={3}
        onClearFilters={mockOnClearFilters}
        hasActiveFilters={false}
      />
    );

    const genresLabel = screen.getByText('Genres');
    expect(genresLabel).toBeInTheDocument();

    // Find and click the collapse button
    const collapseButtons = screen.getAllByRole('button');
    const toggleButton = collapseButtons.find(
      (btn) => btn.querySelector('svg') !== null
    );

    if (toggleButton) {
      fireEvent.click(toggleButton);
      expect(screen.queryByText('Genres')).not.toBeInTheDocument();
    }
  });
});
