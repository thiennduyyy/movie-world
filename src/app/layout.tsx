import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GenresProvider } from '@/lib/genresProvider';
import Nav from '@/components/layout/Nav';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import './globals.css';
import 'swiper/css';
import 'swiper/css/bundle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Movie World Stream',
  description: 'A streaming platform for movies and TV shows',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-b from-gray-900 to-black min-h-screen`}>
        <GenresProvider>
          <ScrollToTop>
            <Nav />
            {/* <PageTransition> */}
              {children}
            {/* </PageTransition> */}
          </ScrollToTop>
        </GenresProvider>
      </body>
    </html>
  );
}
