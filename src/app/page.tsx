import { fetchMovies } from '@/lib/api';
import { MovieList } from '@/components/MovieList';

export default async function HomePage() {
  // Fetch first page server-side for initial render
  const initialData = await fetchMovies(1);

  return <MovieList initialData={initialData} />;
}
