import { Movie } from '@/lib/types';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-fade-in">
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 h-48 flex items-center justify-center">
        <div className="text-center text-white p-4">
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{movie.Title}</h3>
          <p className="text-primary-100 text-sm">{movie.Year}</p>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full font-semibold">
            {movie.Rated}
          </span>
          <span className="text-gray-600">{movie.Runtime}</span>
        </div>

        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
            Genre
          </p>
          <p className="text-sm text-gray-700 line-clamp-1">{movie.Genre}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
            Director
          </p>
          <p className="text-sm text-gray-700 line-clamp-1">{movie.Director}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
            Actors
          </p>
          <p className="text-sm text-gray-700 line-clamp-2">{movie.Actors}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
            Released
          </p>
          <p className="text-sm text-gray-700">{movie.Released}</p>
        </div>
      </div>
    </div>
  );
}
