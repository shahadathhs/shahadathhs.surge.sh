import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ui/theme-provider';
import Navbar from '@/components/shared/nav/Navbar';
import Footer from '@/components/shared/Footer';
import ScrollToTop from '@/components/shared/ScrollToTop';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Sajib | Portfolio',
  description: 'Welcome to my portfolio website',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="container mx-auto px-2 lg:px-4 min-h-screen">
            <Navbar />
            {children}
            <Footer />
          </main>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
