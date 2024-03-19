import type { Metadata } from 'next';
import './globals.css';
import { Suspense } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import Loading from './loading';

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
      <body suppressHydrationWarning={true}>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            {children}
            </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  );
}
