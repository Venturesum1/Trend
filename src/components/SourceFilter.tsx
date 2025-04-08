
import React from 'react';
import { Youtube, MessageSquare, Twitter } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface SourceFilterProps {
  selectedSources: string[];
  onSourceChange: (sources: string[]) => void;
}

const SourceFilter: React.FC<SourceFilterProps> = ({
  selectedSources,
  onSourceChange,
}) => {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2">Filter by Source</h3>
      <ToggleGroup 
        type="multiple" 
        value={selectedSources}
        onValueChange={onSourceChange}
        className="flex justify-start"
      >
        <ToggleGroupItem 
          value="youtube" 
          aria-label="Toggle YouTube" 
          className="flex items-center gap-1 data-[state=on]:bg-red-50 data-[state=on]:text-trend-youtube"
        >
          <Youtube className="h-4 w-4" />
          <span className="hidden sm:inline">YouTube</span>
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="reddit" 
          aria-label="Toggle Reddit"
          className="flex items-center gap-1 data-[state=on]:bg-orange-50 data-[state=on]:text-trend-reddit"
        >
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">Reddit</span>
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="twitter" 
          aria-label="Toggle Twitter"
          className="flex items-center gap-1 data-[state=on]:bg-blue-50 data-[state=on]:text-trend-twitter"
        >
          <Twitter className="h-4 w-4" />
          <span className="hidden sm:inline">Twitter</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default SourceFilter;
