import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'https://wiremock.dev.eroninternational.com/api/movies/search';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';

  try {
    const response = await fetch(`${API_BASE_URL}?page=${page}`, {
      headers: {
        'Accept': 'application/json',
      },
      // Disable caching for development
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `API request failed with status ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        error: 'Failed to fetch movies from external API',
        details: errorMessage,
        url: `${API_BASE_URL}?page=${page}`
      },
      { status: 500 }
    );
  }
}
