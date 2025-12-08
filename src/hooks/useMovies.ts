'use client';

import { useState } from 'react';
import { fetchMovies } from '@/lib/api';
import { Movie, MoviesResponse } from '@/lib/types';

interface UseMoviesReturn {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  totalPages: number;
  currentPage: number;
  totalMovies: number;
}

export function useMovies(initialData?: MoviesResponse): UseMoviesReturn {
  const [movies, setMovies] = useState<Movie[]>(initialData?.data || []);
  const [currentPage, setCurrentPage] = useState(initialData?.page || 1);
  const [totalPages, setTotalPages] = useState(initialData?.total_pages || 1);
  const [totalMovies, setTotalMovies] = useState(initialData?.total || 0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasMore = currentPage < totalPages;

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError(null);

    try {
      const nextPage = currentPage + 1;
      const response = await fetchMovies(nextPage);

      setMovies((prev) => [...prev, ...response.data]);
      setCurrentPage(response.page);
      setTotalPages(response.total_pages);
      setTotalMovies(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load movies');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    movies,
    isLoading,
    error,
    hasMore,
    loadMore,
    totalPages,
    currentPage,
    totalMovies,
  };
}
