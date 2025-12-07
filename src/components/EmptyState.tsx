import { Film } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = 'No Results Found',
  message = 'Try adjusting your filters or search query',
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      {icon || <Film className="w-16 h-16 text-gray-400 mx-auto mb-4" />}
      <h3 className="text-xl font-bold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500 mb-4">{message}</p>
      {onAction && actionLabel && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
