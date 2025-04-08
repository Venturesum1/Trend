
import { TrendItem } from '@/components/TrendCard';
import { v4 as uuidv4 } from 'uuid';

// Function to fetch Reddit search results
export const fetchRedditResults = async (query: string): Promise<TrendItem[]> => {
  try {
    const response = await fetch(`https://www.reddit.com/search.json?q="${encodeURIComponent(query)}"`);
    
    if (!response.ok) {
      throw new Error(`Reddit API error: ${response.status}`);
    }
    
    const data = await response.json();
    const posts = data.data.children;
    
    // Convert Reddit posts to TrendItem format
    return posts.map((post: any) => {
      const postData = post.data;
      
      // Determine sentiment (simple algorithm based on score and controversial flag)
      let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
      if (postData.score > 10 && !postData.controversial) {
        sentiment = 'positive';
      } else if (postData.score < 0 || postData.controversial) {
        sentiment = 'negative';
      }
      
      return {
        id: uuidv4(),
        title: postData.title,
        content: postData.selftext || `${postData.subreddit_name_prefixed}: ${postData.title}`,
        source: 'reddit',
        sentiment: sentiment,
        engagement: {
          likes: postData.score,
          comments: postData.num_comments
        },
        url: `https://reddit.com${postData.permalink}`,
        date: new Date(postData.created_utc * 1000).toISOString(),
        author: postData.author
      };
    });
  } catch (error) {
    console.error('Error fetching Reddit data:', error);
    return [];
  }
};
