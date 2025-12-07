# Eron Movies Challenge - Fullstack Developer Assessment

A modern, responsive web application for browsing and filtering movies released after 2010 by acclaimed directors.

## Features

- **Infinite Scroll**: Seamlessly load more movies as you scroll
- **Advanced Filtering**: Filter by genre, year range, rating, and director
- **Search**: Search by movie title or actor name (debounced for performance)
- **Sorting**: Sort movies by year, title, or rating (ascending/descending)
- **Responsive Design**: Optimized for all screen sizes (mobile, tablet, desktop)
- **Server-Side Rendering**: Fast initial page load with Next.js App Router
- **Clean UX**: Modern interface with loading states, error handling, and empty states

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest + React Testing Library
- **API**: REST (paginated movies API)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Project Structure

```
challenge/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── movies/
│   │   │       └── route.ts        # API proxy for CORS
│   │   ├── layout.tsx              # Root layout with header/footer
│   │   ├── page.tsx                # Home page (SSR)
│   │   └── globals.css             # Global styles
│   ├── components/
│   │   ├── MovieCard.tsx           # Movie display card
│   │   ├── MovieList.tsx           # Main container component
│   │   ├── Filters.tsx             # Filter controls
│   │   ├── SearchBar.tsx           # Debounced search input
│   │   ├── SortControls.tsx        # Sort controls
│   │   ├── ErrorState.tsx          # Error components
│   │   ├── EmptyState.tsx          # Empty state component
│   │   ├── LoadingState.tsx        # Loading skeletons
│   │   ├── InfiniteScrollTrigger.tsx  # Scroll observer
│   │   └── ScrollToTop.tsx         # Scroll-to-top button
│   ├── hooks/
│   │   ├── useMovies.ts            # Movie fetching logic
│   │   ├── useFilters.ts           # Filter state + URL sync
│   │   ├── useInfiniteScroll.ts    # Intersection Observer hook
│   │   └── useDebounce.ts          # Debounce hook
│   ├── lib/
│   │   ├── api.ts                  # API client with CORS handling
│   │   ├── types.ts                # TypeScript interfaces
│   │   └── utils.ts                # Filter/sort utilities
│   └── __tests__/                  # Test files
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── jest.config.js
└── TECHNICAL_DECISIONS.md
```

## API

The application uses the Eron Movies API through a Next.js API route proxy to handle CORS:

**External API**: `https://wiremock.dev.eroninternational.com/api/movies/search?page={pageNumber}`

**Internal Proxy**: `/api/movies?page={pageNumber}` (handles CORS restrictions)

**Response Format**:
```json
{
  "page": 1,
  "per_page": 10,
  "total": 100,
  "total_pages": 10,
  "data": [
    {
      "Title": "Movie Title",
      "Year": "2020",
      "Rated": "PG-13",
      "Released": "01 Jan 2020",
      "Runtime": "120 min",
      "Genre": "Action, Sci-Fi",
      "Director": "Director Name",
      "Writer": "Writer Name",
      "Actors": "Actor 1, Actor 2"
    }
  ]
}
```

## Usage

1. **Browse Movies**: Scroll through the movie collection with automatic pagination
2. **Search**: Type in the search bar to find movies by title or actor
3. **Filter**: Use the filter panel to narrow results by:
   - Year range (2010 - present)
   - Genres (multi-select)
   - Ratings (G, PG, PG-13, R, etc.)
   - Directors (top 10 most frequent)
4. **Sort**: Click sort buttons to order by year, title, or rating
5. **Clear Filters**: Click "Clear all" to reset all active filters
6. **Share**: Filters and sort state are saved in the URL (shareable links)

## Testing

The project includes unit and integration tests:

- **Simple Tests**: MovieCard rendering, debounce hook, API client
- **Complex Tests**: Multi-filter interactions, combined filtering logic, sorting

Coverage focuses on:
- Component rendering
- User interactions
- Business logic (filtering, sorting)
- API error handling

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ features
- No IE11 support

## Performance Optimizations

- Server-side rendering for first page (fast initial load)
- Debounced search (reduces unnecessary renders)
- Intersection Observer for infinite scroll (efficient)
- Client-side filtering (instant feedback)
- URL state sync (shareable, browser back/forward support)

## Future Improvements

See `TECHNICAL_DECISIONS.md` for detailed discussion of:
- Movie details modal (Phase 3)
- Advanced features (favorites, export, recommendations)
- Performance optimizations (React Query, virtualization)
- Additional testing coverage

---

**Built with Next.js, TypeScript, and Tailwind CSS for the Eron Fullstack Developer Challenge**
