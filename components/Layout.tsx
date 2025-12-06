import React from 'react';
import { Snowflake } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 bg-christmas-cream relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 text-christmas-red/10 animate-pulse delay-100 pointer-events-none">
        <Snowflake size={120} />
      </div>
      <div className="absolute bottom-10 right-0 text-christmas-green/10 animate-pulse delay-700 pointer-events-none">
        <Snowflake size={180} />
      </div>
      
      {/* Header */}
      <header className="mb-8 text-center z-10">
        <h1 className="font-festive text-5xl sm:text-6xl text-christmas-red drop-shadow-sm mb-2">
          Gift Exchange
        </h1>
        <div className="h-1 w-24 bg-christmas-gold mx-auto rounded-full mb-4"></div>
      </header>

      {/* Main Content Card */}
      <main className="w-full max-w-md bg-white rounded-3xl shadow-xl border-2 border-christmas-green/20 p-6 sm:p-8 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-12 text-christmas-green/60 text-sm font-sans z-10 text-center">
        <p>🎄 Merry Christmas! 🎄</p>
      </footer>
    </div>
  );
};