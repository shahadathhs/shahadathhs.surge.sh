import { heroData } from '@/constant/heroData';

export default function Footer() {
  return (
    <footer className="mt-24 pt-8 border-t border-border opacity-40 text-[10px] font-bold uppercase tracking-widest text-center">
      <p>
        &copy; {new Date().getFullYear()} {heroData.secondLine}. All rights
        reserved.
      </p>
    </footer>
  );
}
