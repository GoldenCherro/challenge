'use client';

import { FilterState, Movie } from '@/lib/types';
import { getUniqueGenres, getUniqueDirectors, getUniqueRatings } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check, Filter } from 'lucide-react';

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

  const activeFilterCount =
    filters.genres.length +
    filters.ratings.length +
    filters.directors.length +
    (filters.yearRange[0] !== 2010 || filters.yearRange[1] !== new Date().getFullYear() ? 1 : 0);

  return (
    <div className="mb-6">
      {/* Filter Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            {resultCount} {resultCount === 1 ? 'movie' : 'movies'}
          </span>
          {activeFilterCount > 0 && (
            <span className="bg-primary-100 text-primary-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              {activeFilterCount} active
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear all
          </button>
        )}
      </div>

      {/* Filter Dropdowns */}
      <div className="flex flex-wrap gap-3">
        <FilterDropdown
          label="Genre"
          count={filters.genres.length}
          items={uniqueGenres.slice(0, 15)}
          selectedItems={filters.genres}
          onToggle={handleGenreToggle}
        />

        <FilterDropdown
          label="Rating"
          count={filters.ratings.length}
          items={uniqueRatings}
          selectedItems={filters.ratings}
          onToggle={handleRatingToggle}
        />

        <FilterDropdown
          label="Director"
          count={filters.directors.length}
          items={uniqueDirectors.slice(0, 12)}
          selectedItems={filters.directors}
          onToggle={handleDirectorToggle}
        />

        <YearRangeFilter
          yearRange={filters.yearRange}
          onChange={handleYearChange}
          isActive={filters.yearRange[0] !== 2010 || filters.yearRange[1] !== new Date().getFullYear()}
        />
      </div>

      {/* Active Filter Pills */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.genres.map((genre) => (
            <FilterPill
              key={`genre-${genre}`}
              label={genre}
              onRemove={() => handleGenreToggle(genre)}
            />
          ))}
          {filters.ratings.map((rating) => (
            <FilterPill
              key={`rating-${rating}`}
              label={rating}
              onRemove={() => handleRatingToggle(rating)}
            />
          ))}
          {filters.directors.map((director) => (
            <FilterPill
              key={`director-${director}`}
              label={director}
              onRemove={() => handleDirectorToggle(director)}
            />
          ))}
          {(filters.yearRange[0] !== 2010 ||
            filters.yearRange[1] !== new Date().getFullYear()) && (
            <FilterPill
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
      )}
    </div>
  );
}

// Modern Dropdown Filter Component
function FilterDropdown({
  label,
  count,
  items,
  selectedItems,
  onToggle,
}: {
  label: string;
  count: number;
  items: string[];
  selectedItems: string[];
  onToggle: (item: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
          count > 0
            ? 'border-primary-300 bg-primary-50 text-primary-700'
            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        <span className="text-sm font-medium">{label}</span>
        {count > 0 && (
          <span className="bg-primary-600 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
            {count}
          </span>
        )}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10 min-w-[200px] max-h-[300px] overflow-y-auto">
          <div className="p-2">
            {items.map((item) => {
              const isSelected = selectedItems.includes(item);
              return (
                <button
                  key={item}
                  onClick={() => onToggle(item)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                    isSelected
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{item}</span>
                  {isSelected && <Check className="w-4 h-4 text-primary-600" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// Year Range Filter Component
function YearRangeFilter({
  yearRange,
  onChange,
  isActive,
}: {
  yearRange: [number, number];
  onChange: (index: 0 | 1, value: number) => void;
  isActive: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
          isActive
            ? 'border-primary-300 bg-primary-50 text-primary-700'
            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        <span className="text-sm font-medium">Year</span>
        {isActive && (
          <span className="bg-primary-600 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
            1
          </span>
        )}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-4 min-w-[240px]">
          <label className="block text-xs font-semibold text-gray-700 mb-3">Year Range</label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={yearRange[0]}
              onChange={(e) => onChange(0, parseInt(e.target.value) || 2010)}
              min={2010}
              max={yearRange[1]}
              className="w-20 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <span className="text-gray-400 text-sm">to</span>
            <input
              type="number"
              value={yearRange[1]}
              onChange={(e) => onChange(1, parseInt(e.target.value) || new Date().getFullYear())}
              min={yearRange[0]}
              max={new Date().getFullYear()}
              className="w-20 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Filter Pill Component
function FilterPill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-primary-100 text-primary-800 px-3 py-1.5 rounded-full text-sm font-medium">
      {label}
      <button
        onClick={onRemove}
        className="hover:bg-primary-200 rounded-full p-0.5 transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </span>
  );
}
