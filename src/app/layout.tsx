import type { Metadata } from 'next';
import './globals.css';
import { Suspense } from 'react';
import Loading from './loading';
import ErrorBoundary from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'Calendar App',
  description: 'Create a new event or meeting',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            {children}
            </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  );
}
