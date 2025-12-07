import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Movies - Acclaimed Directors Collection',
  description:
    'Explore a curated collection of movies released after 2010, directed by acclaimed directors.',
  keywords: ['movies', 'films', 'directors', 'cinema', 'entertainment'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gradient-to-r from-primary-700 to-primary-900 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold">Movies</h1>
            <p className="text-primary-100 mt-1">
              Acclaimed Directors Collection (2010+)
            </p>
          </div>
        </header>

        <main className="min-h-screen bg-gray-50">{children}</main>

        <footer className="bg-gray-800 text-gray-400 py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>
              &copy; {new Date().getFullYear()} All rights
              reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
