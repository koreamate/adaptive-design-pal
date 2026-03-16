import { useState } from "react";
import { Search, Sparkles, ArrowRight } from "lucide-react";

const suggestions = ["교육예산 추이", "국가채무", "추경", "지방교부세", "복지예산"];

const AISearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="space-y-2.5">
      <div className="relative">
        <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-card border border-border shadow-md">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted shrink-0">
            <Sparkles className="w-4 h-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="궁금한 재정정보를 AI에게 물어보세요"
            className="flex-1 bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
            <Search className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap items-center justify-center">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setQuery(s)}
            className="px-3 py-1 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AISearchBar;
