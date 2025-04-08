import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import SearchBar from '@/components/SearchBar';
import SourceFilter from '@/components/SourceFilter';
import SentimentFilter from '@/components/SentimentFilter';
import TrendsList from '@/components/TrendsList';
import TrendInsights from '@/components/TrendInsights';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { TrendItem } from '@/components/TrendCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import mockData from '@/utils/mockData';
import { fetchRedditResults } from '@/utils/redditApi';

const Index = () => {
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [trends, setTrends] = useState<TrendItem[]>([]);
  const [filteredTrends, setFilteredTrends] = useState<TrendItem[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>(['youtube', 'reddit', 'twitter']);
  const [selectedSentiments, setSelectedSentiments] = useState<string[]>(['positive', 'neutral', 'negative']);
  const [insights, setInsights] = useState<any>(null);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setIsLoading(true);
    
    try {
      // Fetch real Reddit data
      const redditData = await fetchRedditResults(searchQuery);
      
      // Get mock data for other platforms
      const mockYoutubeAndTwitterData = mockData.getTrends(searchQuery)
        .filter(item => item.source !== 'reddit');
      
      // Combine real Reddit data with mock data for other platforms
      const combinedData = [...redditData, ...mockYoutubeAndTwitterData];
      
      setTrends(combinedData);
      
      // Set insights data
      setInsights({
        topKeywords: mockData.getTopKeywords(searchQuery),
        totalEngagement: combinedData.reduce((sum, item) => sum + item.engagement.likes + item.engagement.comments, 0),
        averageSentiment: mockData.getAverageSentiment(combinedData),
        sourcesBreakdown: {
          youtube: combinedData.filter(item => item.source === 'youtube').length,
          reddit: combinedData.filter(item => item.source === 'reddit').length,
          twitter: combinedData.filter(item => item.source === 'twitter').length,
        }
      });
      
      toast({
        title: "Search complete",
        description: `Found ${combinedData.length} results for "${searchQuery}"`,
      });
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search error",
        description: "An error occurred while searching. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Apply filters when sources or sentiments change
  useEffect(() => {
    if (trends.length > 0) {
      const filtered = trends.filter(trend => 
        selectedSources.includes(trend.source) && 
        selectedSentiments.includes(trend.sentiment)
      );
      setFilteredTrends(filtered);
    }
  }, [trends, selectedSources, selectedSentiments]);

  const handleSourceChange = (sources: string[]) => {
    // Ensure at least one source is selected
    setSelectedSources(sources.length ? sources : selectedSources);
  };

  const handleSentimentChange = (sentiments: string[]) => {
    // Ensure at least one sentiment is selected
    setSelectedSentiments(sentiments.length ? sentiments : selectedSentiments);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-6 md:py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-3">
            Discover Social Media Trends
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Explore what people are saying across Reddit, YouTube, and Twitter about any topic, product, or trend.
          </p>
          <div className="flex justify-center">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>

        {query && (
          <>
            <TrendInsights 
              query={query}
              insights={insights}
              isLoading={isLoading}
            />

            <Tabs defaultValue="all" className="mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <TabsList>
                  <TabsTrigger value="all">All Trends</TabsTrigger>
                  <TabsTrigger value="filters">Filter & Sort</TabsTrigger>
                </TabsList>
                
                <div className="text-sm text-muted-foreground mt-2 md:mt-0">
                  Showing {filteredTrends.length} results
                </div>
              </div>
              
              <TabsContent value="all">
                {/* Trends list */}
                <TrendsList trends={filteredTrends} isLoading={isLoading} />
              </TabsContent>
              
              <TabsContent value="filters">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <SourceFilter 
                          selectedSources={selectedSources}
                          onSourceChange={handleSourceChange}
                        />
                        
                        <SentimentFilter
                          selectedSentiments={selectedSentiments}
                          onSentimentChange={handleSentimentChange}
                        />
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Results</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {filteredTrends.length} items matching your filters
                        </p>
                        <TrendsList 
                          trends={filteredTrends.slice(0, 2)} 
                          isLoading={isLoading} 
                        />
                        {filteredTrends.length > 2 && (
                          <p className="text-center text-sm text-muted-foreground mt-4">
                            {filteredTrends.length - 2} more results not shown...
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <TrendsList trends={filteredTrends} isLoading={isLoading} />
          </>
        )}
        
        {!query && !trends.length && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-8">
              Search for a topic above to see trending discussions from Reddit and other social media platforms.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {['IPL Match', 'Climate Change', 'AI Ethics'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSearch(suggestion)}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <p className="font-medium">{suggestion}</p>
                  <p className="text-xs text-muted-foreground mt-1">Example search</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
