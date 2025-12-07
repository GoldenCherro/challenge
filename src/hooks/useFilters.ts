'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FilterState, SortState, Movie } from '@/lib/types';
import { filterMovies, sortMovies } from '@/lib/utils';

const INITIAL_FILTERS: FilterState = {
  search: '',
  genres: [],
  yearRange: [2010, new Date().getFullYear()],
  ratings: [],
  directors: [],
};

const INITIAL_SORT: SortState = {
  field: 'Year',
  direction: 'desc',
};

export function useFilters(allMovies: Movie[]) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize from URL params
  const [filters, setFilters] = useState<FilterState>(() => {
    const search = searchParams.get('search') || '';
    const genres = searchParams.get('genres')?.split(',').filter(Boolean) || [];
    const yearMin = parseInt(searchParams.get('yearMin') || '2010');
    const yearMax = parseInt(
      searchParams.get('yearMax') || String(new Date().getFullYear())
    );
    const ratings = searchParams.get('ratings')?.split(',').filter(Boolean) || [];
    const directors =
      searchParams.get('directors')?.split(',').filter(Boolean) || [];

    return {
      search,
      genres,
      yearRange: [yearMin, yearMax],
      ratings,
      directors,
    };
  });

  const [sort, setSort] = useState<SortState>(() => {
    const field = (searchParams.get('sortField') as SortState['field']) || 'Year';
    const direction =
      (searchParams.get('sortDir') as SortState['direction']) || 'desc';
    return { field, direction };
  });

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.search) params.set('search', filters.search);
    if (filters.genres.length) params.set('genres', filters.genres.join(','));
    if (filters.yearRange[0] !== 2010)
      params.set('yearMin', String(filters.yearRange[0]));
    if (filters.yearRange[1] !== new Date().getFullYear())
      params.set('yearMax', String(filters.yearRange[1]));
    if (filters.ratings.length) params.set('ratings', filters.ratings.join(','));
    if (filters.directors.length)
      params.set('directors', filters.directors.join(','));
    if (sort.field !== 'Year') params.set('sortField', sort.field);
    if (sort.direction !== 'desc') params.set('sortDir', sort.direction);

    const newUrl = params.toString() ? `?${params.toString()}` : '/';
    router.replace(newUrl, { scroll: false });
  }, [filters, sort, router]);

  // Apply filters and sorting
  const filteredAndSortedMovies = useMemo(() => {
    const filtered = filterMovies(allMovies, filters);
    return sortMovies(filtered, sort);
  }, [allMovies, filters, sort]);

  const clearFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const hasActiveFilters = useMemo(() => {
    return (
      filters.search !== '' ||
      filters.genres.length > 0 ||
      filters.yearRange[0] !== 2010 ||
      filters.yearRange[1] !== new Date().getFullYear() ||
      filters.ratings.length > 0 ||
      filters.directors.length > 0
    );
  }, [filters]);

  return {
    filters,
    setFilters,
    sort,
    setSort,
    filteredMovies: filteredAndSortedMovies,
    clearFilters,
    hasActiveFilters,
  };
}
