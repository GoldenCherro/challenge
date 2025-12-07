'use client';

import { SortState, SortField, SortDirection } from '@/lib/types';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface SortControlsProps {
  sort: SortState;
  onSortChange: (sort: SortState) => void;
}

export function SortControls({ sort, onSortChange }: SortControlsProps) {
  const sortOptions: { label: string; field: SortField }[] = [
    { label: 'Year', field: 'Year' },
    { label: 'Title', field: 'Title' },
    { label: 'Rating', field: 'Rated' },
  ];

  const handleFieldChange = (field: SortField) => {
    onSortChange({ ...sort, field });
  };

  const handleDirectionToggle = () => {
    const newDirection: SortDirection = sort.direction === 'asc' ? 'desc' : 'asc';
    onSortChange({ ...sort, direction: newDirection });
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm font-medium text-gray-700">Sort by:</span>

      <div className="flex gap-2">
        {sortOptions.map((option) => (
          <button
            key={option.field}
            onClick={() => handleFieldChange(option.field)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              sort.field === option.field
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <button
        onClick={handleDirectionToggle}
        className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        title={sort.direction === 'asc' ? 'Ascending' : 'Descending'}
      >
        {sort.direction === 'asc' ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
