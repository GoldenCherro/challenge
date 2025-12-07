import { fetchMovies, APIError } from '../api';

global.fetch = jest.fn();

describe('API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches movies successfully', async () => {
    const mockResponse = {
      page: 1,
      per_page: 10,
      total: 100,
      total_pages: 10,
      data: [
        {
          Title: 'Test Movie',
          Year: '2020',
          Rated: 'PG-13',
          Released: '01 Jan 2020',
          Runtime: '120 min',
          Genre: 'Action',
          Director: 'Test Director',
          Writer: 'Test Writer',
          Actors: 'Test Actor',
        },
      ],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchMovies(1);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('?page=1'),
      expect.any(Object)
    );
    expect(result).toEqual(mockResponse);
  });

  it('throws APIError on network failure', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new TypeError('Network error')
    );

    await expect(fetchMovies(1)).rejects.toThrow('Network error');
  });

  it('throws APIError on non-ok response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
      status: 404,
    });

    await expect(fetchMovies(1)).rejects.toThrow(APIError);
  });

  it('validates response structure', async () => {
    const invalidResponse = {
      page: 1,
      // missing required fields
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => invalidResponse,
    });

    await expect(fetchMovies(1)).rejects.toThrow('Invalid API response format');
  });
});
