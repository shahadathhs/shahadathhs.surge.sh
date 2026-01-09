import FloatingActionMenu from '@/components/shared/FloatingActionMenu';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/nav/Navbar';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto px-2 lg:px-4 min-h-screen">
      {/* navbar */}
      <Navbar />

      {/* main content */}
      {children}

      {/* footer */}
      <Footer />

      {/* Floating Action Menu */}
      <FloatingActionMenu />
    </main>
  );
}
