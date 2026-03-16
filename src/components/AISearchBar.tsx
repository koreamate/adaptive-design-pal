import { useState } from "react";
import { Search, Sparkles } from "lucide-react";

const suggestions = ["교육예산 추이", "국가채무", "추경"];

const AISearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="space-y-3">
      <div className="gov-ai-search">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gov-blue shrink-0">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="궁금한 재정정보를 물어보세요"
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
        />
        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
          <Search className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setQuery(s)}
            className="gov-tag hover:bg-muted transition-colors cursor-pointer"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AISearchBar;
