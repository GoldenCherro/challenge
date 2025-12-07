import { MoviesResponse } from './types';

// Use absolute URL for server-side rendering, relative URL for client-side
const getApiUrl = () => {
  if (typeof window === 'undefined') {
    // Server-side: use absolute URL
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/movies';
  }
  // Client-side: use relative URL
  return '/api/movies';
};

export class APIError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export async function fetchMovies(page: number): Promise<MoviesResponse> {
  try {
    const url = `${getApiUrl()}?page=${page}`;
    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new APIError(
        `Failed to fetch movies: ${response.statusText}`,
        response.status
      );
    }

    const data: MoviesResponse = await response.json();

    // Validate response structure
    if (
      !data.data ||
      !Array.isArray(data.data) ||
      typeof data.page !== 'number' ||
      typeof data.total_pages !== 'number'
    ) {
      throw new APIError('Invalid API response format');
    }

    return data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }

    if (error instanceof TypeError) {
      throw new APIError('Network error: Unable to fetch movies');
    }

    throw new APIError('An unexpected error occurred');
  }
}

export async function fetchAllMovies(): Promise<MoviesResponse> {
  // Fetch first page to get total_pages
  const firstPage = await fetchMovies(1);
  const { total_pages } = firstPage;

  if (total_pages === 1) {
    return firstPage;
  }

  // Fetch remaining pages in parallel
  const pagePromises: Promise<MoviesResponse>[] = [];
  for (let page = 2; page <= total_pages; page++) {
    pagePromises.push(fetchMovies(page));
  }

  const remainingPages = await Promise.all(pagePromises);

  // Combine all data
  const allMovies = [
    ...firstPage.data,
    ...remainingPages.flatMap((response) => response.data),
  ];

  return {
    ...firstPage,
    data: allMovies,
  };
}
