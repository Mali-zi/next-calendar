import type { Metadata } from 'next';
import './globals.css';
import { Suspense } from 'react';
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
      <body>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
