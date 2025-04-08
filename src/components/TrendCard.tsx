
import React from 'react';
import { ArrowUpRight, MessageSquare, ThumbsUp } from 'lucide-react';

export interface TrendItem {
  id: string;
  title: string;
  content: string;
  source: 'youtube' | 'reddit' | 'twitter';
  sentiment: 'positive' | 'neutral' | 'negative';
  engagement: {
    likes: number;
    comments: number;
  };
  url: string;
  date: string;
  author: string;
}

interface TrendCardProps {
  item: TrendItem;
}

const TrendCard: React.FC<TrendCardProps> = ({ item }) => {
  const sourceLabel = {
    youtube: 'YouTube',
    reddit: 'Reddit',
    twitter: 'Twitter'
  };

  const sentimentLabel = {
    positive: 'Positive',
    neutral: 'Neutral',
    negative: 'Negative'
  };

  return (
    <div className="trend-card">
      <div className="flex justify-between items-start mb-2">
        <div className="space-x-2">
          <span className={`trend-source-badge trend-source-badge-${item.source}`}>
            {sourceLabel[item.source]}
          </span>
          <span className={`sentiment-badge sentiment-badge-${item.sentiment}`}>
            {sentimentLabel[item.sentiment]}
          </span>
        </div>
        <a 
          href={item.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
      <h3 className="font-semibold text-base mb-1 line-clamp-2">{item.title}</h3>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{item.content}</p>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{item.author} • {new Date(item.date).toLocaleDateString()}</span>
        <div className="flex items-center space-x-3">
          <span className="flex items-center">
            <ThumbsUp className="h-3 w-3 mr-1" />
            {item.engagement.likes.toLocaleString()}
          </span>
          <span className="flex items-center">
            <MessageSquare className="h-3 w-3 mr-1" />
            {item.engagement.comments.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrendCard;
