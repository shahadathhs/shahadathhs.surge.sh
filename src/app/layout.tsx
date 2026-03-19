import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Shahadath Hossen Sajib | Backend Developer Portfolio',
  description:
    'Backend Developer specializing in Node.js, NestJS, Python, FastAPI, and Microservices. Building scalable, secure, and high-performance systems.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <main className="mx-auto max-w-2xl min-h-screen px-6 py-24">
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
