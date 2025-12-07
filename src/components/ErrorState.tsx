import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  title = 'Error',
  message,
  onRetry,
  retryLabel = 'Retry',
}: ErrorStateProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
      <h2 className="text-xl font-bold text-red-800 mb-2">{title}</h2>
      <p className="text-red-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
}

export function ErrorPage({ title, message, onRetry, retryLabel }: ErrorStateProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <ErrorState
        title={title}
        message={message}
        onRetry={onRetry}
        retryLabel={retryLabel}
      />
    </div>
  );
}

export function LoadMoreError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
      <p className="text-yellow-800">{message}</p>
      <button
        onClick={onRetry}
        className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
