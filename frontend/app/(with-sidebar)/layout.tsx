"use client"
import Navbar from '@/src/components/ui/Navbar';
import Sidebar from '@/src/components/ui/Sidebar';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="min-h-screen">
      <Navbar/>
      <div className="flex">
        <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>
        <div className={`flex-1 transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-16'}`}>
            {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;