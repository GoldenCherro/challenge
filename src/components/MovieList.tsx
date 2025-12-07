'use client';

import { MoviesResponse } from '@/lib/types';
import { useMovies } from '@/hooks/useMovies';
import { useFilters } from '@/hooks/useFilters';
import { MovieCard } from './MovieCard';
import { LoadingState, LoadingMore } from './LoadingState';
import { Filters } from './Filters';
import { SearchBar } from './SearchBar';
import { SortControls } from './SortControls';
import { InfiniteScrollTrigger } from './InfiniteScrollTrigger';
import { ScrollToTop } from './ScrollToTop';
import { ErrorPage, LoadMoreError } from './ErrorState';
import { EmptyState } from './EmptyState';

interface MovieListProps {
  initialData: MoviesResponse;
}

export function MovieList({ initialData }: MovieListProps) {
  const { movies, isLoading, error, hasMore, loadMore } = useMovies(initialData);

  const {
    filters,
    setFilters,
    sort,
    setSort,
    filteredMovies,
    clearFilters,
    hasActiveFilters,
  } = useFilters(movies);

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  if (error && movies.length === 0) {
    return (
      <ErrorPage
        title="Error Loading Movies"
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>

      {/* Filters */}
      <Filters
        filters={filters}
        onFiltersChange={setFilters}
        allMovies={movies}
        resultCount={filteredMovies.length}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Sort Controls */}
      <div className="mb-6">
        <SortControls sort={sort} onSortChange={setSort} />
      </div>

      {/* Movies Grid */}
      {movies.length === 0 && isLoading ? (
        <LoadingState />
      ) : filteredMovies.length === 0 ? (
        <EmptyState
          title="No Movies Found"
          message="Try adjusting your filters or search query"
          actionLabel={hasActiveFilters ? 'Clear All Filters' : undefined}
          onAction={hasActiveFilters ? clearFilters : undefined}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {filteredMovies.map((movie, index) => (
              <MovieCard key={`${movie.Title}-${index}`} movie={movie} />
            ))}
          </div>

          {/* Infinite Scroll Trigger */}
          {hasMore && (
            <>
              <InfiniteScrollTrigger
                onLoadMore={loadMore}
                hasMore={hasMore}
                isLoading={isLoading}
              />
              {isLoading && <LoadingMore />}
            </>
          )}

          {/* Error during load more */}
          {error && movies.length > 0 && (
            <LoadMoreError message={error} onRetry={loadMore} />
          )}
        </>
      )}

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
