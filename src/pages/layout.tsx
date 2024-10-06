import React, { ReactNode } from 'react';
import Header from './components/header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="container mx-auto py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
