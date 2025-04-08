
import React from 'react';
import TrendCard, { TrendItem } from './TrendCard';

interface TrendsListProps {
  trends: TrendItem[];
  isLoading: boolean;
}

const TrendsList: React.FC<TrendsListProps> = ({ trends, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="trend-card animate-pulse-subtle">
            <div className="flex justify-between items-start mb-2">
              <div className="flex space-x-2">
                <div className="h-5 w-16 rounded-full bg-gray-200"></div>
                <div className="h-5 w-16 rounded-full bg-gray-200"></div>
              </div>
              <div className="h-4 w-4 rounded bg-gray-200"></div>
            </div>
            <div className="h-5 w-3/4 bg-gray-200 rounded mb-1"></div>
            <div className="h-4 w-full bg-gray-200 rounded mb-1"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded mb-1"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded mb-3"></div>
            <div className="flex items-center justify-between">
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
              <div className="flex items-center space-x-3">
                <div className="h-3 w-12 bg-gray-200 rounded"></div>
                <div className="h-3 w-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (trends.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">No trends found. Try searching for a different topic.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {trends.map((trend) => (
        <TrendCard key={trend.id} item={trend} />
      ))}
    </div>
  );
};

export default TrendsList;
