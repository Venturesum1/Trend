
import { TrendItem } from '@/components/TrendCard';
import { v4 as uuidv4 } from 'uuid';

const generateRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// List of authors for each platform
const authors = {
  youtube: ['TechReviewer', 'DigitalInsights', 'FutureTech', 'TrendWatcher', 'InnovationHub'],
  reddit: ['u/techgeek', 'u/future_visionary', 'u/digital_nomad', 'u/trendspotter', 'u/innovation_seeker'],
  twitter: ['@TechTrends', '@FutureInsight', '@DigitalPulse', '@TrendRadar', '@InnovateDaily'],
};

// Keywords for different topics
const topicKeywords: Record<string, string[]> = {
  'apple vision pro': ['AR/VR', 'Spatial Computing', 'Apple', 'headset', 'immersive'],
  'climate change': ['global warming', 'sustainability', 'renewable energy', 'carbon emissions', 'policy'],
  'ai ethics': ['bias', 'regulation', 'transparency', 'accountability', 'privacy'],
  'default': ['trending', 'popular', 'viral', 'discussion', 'technology'],
};

// Generate trend content based on topic and sentiment
const generateContent = (topic: string, sentiment: 'positive' | 'neutral' | 'negative', source: 'youtube' | 'reddit' | 'twitter') => {
  const topicLower = topic.toLowerCase();
  
  const positiveComments = {
    'apple vision pro': [
      "The Apple Vision Pro is absolutely groundbreaking! The spatial computing experience feels like the future of technology.",
      "I'm blown away by the display quality and immersive experience of the Vision Pro. Worth every penny.",
      "Apple has outdone themselves with the Vision Pro. The eye and hand tracking is incredibly intuitive."
    ],
    'climate change': [
      "The recent advances in renewable energy technology are giving us real hope in the fight against climate change.",
      "It's inspiring to see countries coming together to address climate change with actionable policies.",
      "The shift towards sustainable practices in major corporations shows real progress in our climate goals."
    ],
    'ai ethics': [
      "The new AI transparency frameworks are a major step forward for ethical AI development.",
      "Companies implementing responsible AI practices are seeing better outcomes and user trust.",
      "The multidisciplinary approach to AI ethics is creating more fair and accountable systems."
    ],
    'default': [
      "This is revolutionary and could change everything in the industry!",
      "I'm extremely impressed with the innovation and thoughtfulness behind this.",
      "The potential applications are endless and very exciting."
    ]
  };
  
  const neutralComments = {
    'apple vision pro': [
      "The Apple Vision Pro has impressive features but the price point may limit mass adoption.",
      "While the technology is advanced, it remains to be seen if it will replace existing devices.",
      "The Vision Pro introduces interesting concepts, though it's still a first-generation product with expected limitations."
    ],
    'climate change': [
      "Climate data shows mixed progress - some regions improving while others face increased challenges.",
      "The economic implications of climate policy need to be balanced with environmental goals.",
      "New technologies offer potential solutions, but implementation timelines remain uncertain."
    ],
    'ai ethics': [
      "Current AI regulations provide a framework, but questions remain about enforcement and effectiveness.",
      "The balance between innovation and ethical constraints continues to be debated among experts.",
      "Different cultural perspectives on AI ethics create challenges for global standards."
    ],
    'default': [
      "This has both advantages and disadvantages that need to be considered.",
      "The data shows mixed results that require further analysis.",
      "It's an interesting development, though not necessarily groundbreaking."
    ]
  };
  
  const negativeComments = {
    'apple vision pro': [
      "The Apple Vision Pro is ridiculously overpriced for what it offers. Classic Apple tax at work.",
      "The battery life and comfort issues make the Vision Pro impractical for extended use.",
      "I'm disappointed by the limited app ecosystem and the restrictive Apple environment."
    ],
    'climate change': [
      "Despite all the talk, major polluters continue to avoid meaningful action on climate change.",
      "The current policies are far too weak to address the severity of the climate crisis.",
      "Corporate greenwashing is distracting from the lack of substantive climate progress."
    ],
    'ai ethics': [
      "The current AI oversight is completely inadequate to prevent serious ethical violations.",
      "Major tech companies are ignoring ethical considerations in their race to deploy AI systems.",
      "Algorithmic bias continues to cause real harm while meaningful regulation lags behind."
    ],
    'default': [
      "This is a major disappointment that fails to deliver on its promises.",
      "The negative implications far outweigh any potential benefits.",
      "I'm concerned about the serious problems this creates."
    ]
  };
  
  // Select appropriate comment pool
  let commentPool;
  if (sentiment === 'positive') {
    commentPool = positiveComments[topicLower] || positiveComments['default'];
  } else if (sentiment === 'neutral') {
    commentPool = neutralComments[topicLower] || neutralComments['default'];
  } else {
    commentPool = negativeComments[topicLower] || negativeComments['default'];
  }
  
  // Select a random comment from the pool
  return commentPool[Math.floor(Math.random() * commentPool.length)];
};

// Generate title based on topic, sentiment, and source
const generateTitle = (topic: string, sentiment: 'positive' | 'neutral' | 'negative', source: 'youtube' | 'reddit' | 'twitter') => {
  const topicLower = topic.toLowerCase();
  
  const titlePrefixes = {
    positive: [
      "Impressive: ", 
      "Game-Changing: ", 
      "Revolutionary: ", 
      "Must See: ", 
      "Amazing: "
    ],
    neutral: [
      "Analyzing: ", 
      "Exploring: ", 
      "Deep Dive: ", 
      "Understanding: ", 
      "The Truth About: "
    ],
    negative: [
      "Disappointing: ", 
      "Overrated: ", 
      "The Problem With: ", 
      "Why I'm Skeptical About: ", 
      "Concerns About: "
    ]
  };
  
  const sourceSpecificFormats = {
    youtube: [
      `${titlePrefixes[sentiment][Math.floor(Math.random() * 5)]}${topic} - Full Review`,
      `${topic} Explained | What You Need To Know`,
      `The REAL Truth About ${topic} That No One Is Talking About`
    ],
    reddit: [
      `[Discussion] My thoughts on ${topic} after extensive research`,
      `Can we talk about ${topic}? My personal experience`,
      `${topic}: An in-depth analysis and discussion`
    ],
    twitter: [
      `${topic} - Thread: Here's what you should know 🧵`,
      `I've been researching ${topic} for months. Here's my take.`,
      `${topic} is changing everything. Let me explain why.`
    ]
  };
  
  return sourceSpecificFormats[source][Math.floor(Math.random() * 3)];
};

// Mock data generator for trends
const mockData = {
  getTrends: (query: string): TrendItem[] => {
    // If no query, return empty array
    if (!query.trim()) return [];
    
    const trends: TrendItem[] = [];
    const sources: ('youtube' | 'reddit' | 'twitter')[] = ['youtube', 'reddit', 'twitter'];
    const sentiments: ('positive' | 'neutral' | 'negative')[] = ['positive', 'neutral', 'negative'];
    
    // Current date and 30 days ago for random dates
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    // Generate 15-25 random trend items
    const count = Math.floor(Math.random() * 11) + 15;
    
    for (let i = 0; i < count; i++) {
      const source = sources[Math.floor(Math.random() * sources.length)];
      const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
      
      const trend: TrendItem = {
        id: uuidv4(),
        title: generateTitle(query, sentiment, source),
        content: generateContent(query, sentiment, source),
        source: source,
        sentiment: sentiment,
        engagement: {
          likes: Math.floor(Math.random() * 10000),
          comments: Math.floor(Math.random() * 2000)
        },
        url: `https://example.com/${source}/${uuidv4()}`,
        date: generateRandomDate(thirtyDaysAgo, now).toISOString(),
        author: authors[source][Math.floor(Math.random() * authors[source].length)]
      };
      
      trends.push(trend);
    }
    
    // Sort by engagement (likes + comments) descending
    return trends.sort((a, b) => 
      (b.engagement.likes + b.engagement.comments) - (a.engagement.likes + a.engagement.comments)
    );
  },
  
  getTopKeywords: (query: string): string[] => {
    const queryLower = query.toLowerCase();
    
    // Return topic-specific keywords or default keywords
    return topicKeywords[queryLower] || topicKeywords['default'];
  },
  
  getAverageSentiment: (trends: TrendItem[]): string => {
    if (!trends.length) return 'Neutral';
    
    // Count of each sentiment
    const sentimentCounts = {
      positive: trends.filter(t => t.sentiment === 'positive').length,
      neutral: trends.filter(t => t.sentiment === 'neutral').length,
      negative: trends.filter(t => t.sentiment === 'negative').length
    };
    
    // Determine dominant sentiment
    if (sentimentCounts.positive > sentimentCounts.neutral && sentimentCounts.positive > sentimentCounts.negative) {
      return 'Mostly Positive';
    } else if (sentimentCounts.negative > sentimentCounts.neutral && sentimentCounts.negative > sentimentCounts.positive) {
      return 'Mostly Negative';
    } else if (sentimentCounts.neutral > sentimentCounts.positive && sentimentCounts.neutral > sentimentCounts.negative) {
      return 'Mostly Neutral';
    } else {
      return 'Mixed';
    }
  }
};

export default mockData;
