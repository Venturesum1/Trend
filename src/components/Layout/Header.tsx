
import React from 'react';
import { BarChart2, Search } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="border-b sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2">
          <BarChart2 className="h-6 w-6 text-primary" />
          <span className="font-semibold text-xl">Trend Beacon</span>
          <span className="text-sm text-muted-foreground hidden md:inline-block">
            | Reddit API Explorer
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
