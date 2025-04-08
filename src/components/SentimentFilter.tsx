
import React from 'react';
import { ThumbsUp, Minus, ThumbsDown } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface SentimentFilterProps {
  selectedSentiments: string[];
  onSentimentChange: (sentiments: string[]) => void;
}

const SentimentFilter: React.FC<SentimentFilterProps> = ({
  selectedSentiments,
  onSentimentChange,
}) => {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2">Filter by Sentiment</h3>
      <ToggleGroup 
        type="multiple" 
        value={selectedSentiments}
        onValueChange={onSentimentChange}
        className="flex justify-start"
      >
        <ToggleGroupItem 
          value="positive" 
          aria-label="Toggle Positive" 
          className="flex items-center gap-1 data-[state=on]:bg-green-50 data-[state=on]:text-green-700"
        >
          <ThumbsUp className="h-4 w-4" />
          <span className="hidden sm:inline">Positive</span>
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="neutral" 
          aria-label="Toggle Neutral"
          className="flex items-center gap-1 data-[state=on]:bg-gray-50 data-[state=on]:text-gray-700"
        >
          <Minus className="h-4 w-4" />
          <span className="hidden sm:inline">Neutral</span>
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="negative" 
          aria-label="Toggle Negative"
          className="flex items-center gap-1 data-[state=on]:bg-red-50 data-[state=on]:text-red-700"
        >
          <ThumbsDown className="h-4 w-4" />
          <span className="hidden sm:inline">Negative</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default SentimentFilter;
