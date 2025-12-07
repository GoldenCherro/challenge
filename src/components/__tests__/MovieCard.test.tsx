import { render, screen } from '@testing-library/react';
import { MovieCard } from '../MovieCard';
import { Movie } from '@/lib/types';

const mockMovie: Movie = {
  Title: 'Inception',
  Year: '2010',
  Rated: 'PG-13',
  Released: '16 Jul 2010',
  Runtime: '148 min',
  Genre: 'Action, Sci-Fi, Thriller',
  Director: 'Christopher Nolan',
  Writer: 'Christopher Nolan',
  Actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
};

describe('MovieCard', () => {
  it('renders movie title', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('Inception')).toBeInTheDocument();
  });

  it('renders movie year', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('2010')).toBeInTheDocument();
  });

  it('renders movie rating', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('PG-13')).toBeInTheDocument();
  });

  it('renders movie runtime', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('148 min')).toBeInTheDocument();
  });

  it('renders movie genre', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('Action, Sci-Fi, Thriller')).toBeInTheDocument();
  });

  it('renders movie director', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('Christopher Nolan')).toBeInTheDocument();
  });

  it('renders movie actors', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(
      screen.getByText('Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page')
    ).toBeInTheDocument();
  });

  it('renders movie release date', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('16 Jul 2010')).toBeInTheDocument();
  });
});
