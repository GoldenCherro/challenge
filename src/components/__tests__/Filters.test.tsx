import { render, screen, fireEvent, within } from '@testing-library/react';
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

  it('renders filter dropdowns and result count', () => {
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

    expect(screen.getByText('3 movies')).toBeInTheDocument();
    expect(screen.getByText('Genre')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText('Director')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
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

    // Open the Genre dropdown
    const genreDropdown = screen.getByRole('button', { name: /Genre/i });
    fireEvent.click(genreDropdown);

    // Click on Action in the dropdown
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

    // Open the Genre dropdown
    const genreDropdown = screen.getByRole('button', { name: /Genre/i });
    fireEvent.click(genreDropdown);

    // Click on Sci-Fi
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

    // Click on Action pill to remove it
    const actionPill = screen.getByText('Action').closest('span');
    const removeButton = actionPill?.querySelector('button');
    if (removeButton) {
      fireEvent.click(removeButton);
    }

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

    // Open Rating dropdown
    const ratingDropdown = screen.getByRole('button', { name: /Rating/i });
    fireEvent.click(ratingDropdown);

    // Click PG-13
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

    // Open Director dropdown
    const directorDropdown = screen.getByRole('button', { name: /Director/i });
    fireEvent.click(directorDropdown);

    // Click Christopher Nolan
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

    // Open Year dropdown
    const yearDropdown = screen.getByRole('button', { name: /Year/i });
    fireEvent.click(yearDropdown);

    // Get year inputs and change the minimum year
    const yearInputs = screen.getAllByRole('spinbutton');
    const minYearInput = yearInputs[0];

    fireEvent.change(minYearInput, { target: { value: '2012' } });

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...initialFilters,
      yearRange: [2012, 2024],
    });
  });

  it('displays active filters as pills', () => {
    const currentYear = new Date().getFullYear();
    const activeFilters: FilterState = {
      search: '',
      genres: ['Action', 'Sci-Fi'],
      yearRange: [2015, currentYear], // Modified year range to be active
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

    // Count: 2 genres + 1 rating + 1 director + 1 year range = 5 active filters
    expect(screen.getByText('5 active')).toBeInTheDocument();
    expect(screen.getByText('Clear all')).toBeInTheDocument();

    // Check filter pills are displayed
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Sci-Fi')).toBeInTheDocument();
    expect(screen.getByText('PG-13')).toBeInTheDocument();
    expect(screen.getByText('Christopher Nolan')).toBeInTheDocument();
    expect(screen.getByText(`2015 - ${currentYear}`)).toBeInTheDocument();
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

  it('shows dropdown count badge when filters are active', () => {
    const activeFilters: FilterState = {
      ...initialFilters,
      genres: ['Action', 'Sci-Fi'],
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

    // Check that Genre dropdown shows count badge
    const genreButton = screen.getByRole('button', { name: /Genre/i });
    expect(genreButton.textContent).toContain('2');
  });

  it('shows checkmark for selected items in dropdown', () => {
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

    // Open Genre dropdown
    const genreDropdown = screen.getByRole('button', { name: /Genre/i });
    fireEvent.click(genreDropdown);

    // Action should be selected (has checkmark)
    const actionButton = screen.getByRole('button', { name: 'Action' });
    expect(actionButton.classList.contains('bg-primary-50')).toBe(true);
  });
});
