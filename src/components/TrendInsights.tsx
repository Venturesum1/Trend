
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, MessageSquare, ThumbsUp, BarChart2 } from 'lucide-react';

interface TrendInsightsProps {
  query: string;
  insights: {
    topKeywords: string[];
    totalEngagement: number;
    averageSentiment: string;
    sourcesBreakdown: {
      youtube: number;
      reddit: number;
      twitter: number;
    };
  } | null;
  isLoading: boolean;
}

const TrendInsights: React.FC<TrendInsightsProps> = ({ query, insights, isLoading }) => {
  if (!query || isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse-subtle">
            <CardHeader className="pb-2">
              <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
              <div className="h-6 w-36 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-12 w-full bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!insights) {
    return null;
  }

  const { topKeywords, totalEngagement, averageSentiment, sourcesBreakdown } = insights;
  const totalSources = sourcesBreakdown.youtube + sourcesBreakdown.reddit + sourcesBreakdown.twitter;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Top Keywords</CardDescription>
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" />
            Discussion Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {topKeywords.map((keyword, index) => (
              <Badge key={index} variant="secondary">{keyword}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Engagement</CardDescription>
          <CardTitle className="text-lg flex items-center">
            <ThumbsUp className="mr-2 h-4 w-4 text-muted-foreground" />
            {totalEngagement.toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Total likes, comments, and shares across all platforms
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Average Sentiment</CardDescription>
          <CardTitle className="text-lg flex items-center">
            <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
            {averageSentiment}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Overall sentiment analysis from all sources
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Sources</CardDescription>
          <CardTitle className="text-lg flex items-center">
            <BarChart2 className="mr-2 h-4 w-4 text-muted-foreground" />
            Platform Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-14">YouTube:</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-trend-youtube" 
                style={{ width: `${(sourcesBreakdown.youtube / totalSources) * 100}%` }}
              ></div>
            </div>
            <span>{sourcesBreakdown.youtube}</span>
          </div>
          <div className="flex items-center gap-2 text-xs mt-2">
            <span className="w-14">Reddit:</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-trend-reddit" 
                style={{ width: `${(sourcesBreakdown.reddit / totalSources) * 100}%` }}
              ></div>
            </div>
            <span>{sourcesBreakdown.reddit}</span>
          </div>
          <div className="flex items-center gap-2 text-xs mt-2">
            <span className="w-14">Twitter:</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-trend-twitter" 
                style={{ width: `${(sourcesBreakdown.twitter / totalSources) * 100}%` }}
              ></div>
            </div>
            <span>{sourcesBreakdown.twitter}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendInsights;
