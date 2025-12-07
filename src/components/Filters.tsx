'use client';

import { FilterState, Movie } from '@/lib/types';
import { getUniqueGenres, getUniqueDirectors, getUniqueRatings } from '@/lib/utils';
import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface FiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  allMovies: Movie[];
  resultCount: number;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function Filters({
  filters,
  onFiltersChange,
  allMovies,
  resultCount,
  onClearFilters,
  hasActiveFilters,
}: FiltersProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const uniqueGenres = getUniqueGenres(allMovies);
  const uniqueDirectors = getUniqueDirectors(allMovies);
  const uniqueRatings = getUniqueRatings(allMovies);

  const handleGenreToggle = (genre: string) => {
    const newGenres = filters.genres.includes(genre)
      ? filters.genres.filter((g) => g !== genre)
      : [...filters.genres, genre];
    onFiltersChange({ ...filters, genres: newGenres });
  };

  const handleRatingToggle = (rating: string) => {
    const newRatings = filters.ratings.includes(rating)
      ? filters.ratings.filter((r) => r !== rating)
      : [...filters.ratings, rating];
    onFiltersChange({ ...filters, ratings: newRatings });
  };

  const handleDirectorToggle = (director: string) => {
    const newDirectors = filters.directors.includes(director)
      ? filters.directors.filter((d) => d !== director)
      : [...filters.directors, director];
    onFiltersChange({ ...filters, directors: newDirectors });
  };

  const handleYearChange = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...filters.yearRange];
    newRange[index] = value;
    onFiltersChange({ ...filters, yearRange: newRange });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-gray-800">Filters</h2>
          <span className="text-sm text-gray-600">
            {resultCount} {resultCount === 1 ? 'result' : 'results'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear all
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronDown
              className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* Year Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Year Range
            </label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={filters.yearRange[0]}
                onChange={(e) => handleYearChange(0, parseInt(e.target.value))}
                min={2010}
                max={filters.yearRange[1]}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                value={filters.yearRange[1]}
                onChange={(e) => handleYearChange(1, parseInt(e.target.value))}
                min={filters.yearRange[0]}
                max={new Date().getFullYear()}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Genres */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Genres
            </label>
            <div className="flex flex-wrap gap-2">
              {uniqueGenres.slice(0, 10).map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleGenreToggle(genre)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    filters.genres.includes(genre)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Ratings */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ratings
            </label>
            <div className="flex flex-wrap gap-2">
              {uniqueRatings.map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingToggle(rating)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    filters.ratings.includes(rating)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>

          {/* Directors */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Directors (Top 10)
            </label>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {uniqueDirectors.slice(0, 10).map((director) => (
                <button
                  key={director}
                  onClick={() => handleDirectorToggle(director)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    filters.directors.includes(director)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {director}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">
            Active Filters
          </p>
          <div className="flex flex-wrap gap-2">
            {filters.genres.map((genre) => (
              <FilterBadge
                key={`genre-${genre}`}
                label={genre}
                onRemove={() => handleGenreToggle(genre)}
              />
            ))}
            {filters.ratings.map((rating) => (
              <FilterBadge
                key={`rating-${rating}`}
                label={rating}
                onRemove={() => handleRatingToggle(rating)}
              />
            ))}
            {filters.directors.map((director) => (
              <FilterBadge
                key={`director-${director}`}
                label={director}
                onRemove={() => handleDirectorToggle(director)}
              />
            ))}
            {(filters.yearRange[0] !== 2010 ||
              filters.yearRange[1] !== new Date().getFullYear()) && (
              <FilterBadge
                label={`${filters.yearRange[0]} - ${filters.yearRange[1]}`}
                onRemove={() =>
                  onFiltersChange({
                    ...filters,
                    yearRange: [2010, new Date().getFullYear()],
                  })
                }
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function FilterBadge({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
      {label}
      <button onClick={onRemove} className="hover:text-primary-900">
        <X className="w-4 h-4" />
      </button>
    </span>
  );
}
