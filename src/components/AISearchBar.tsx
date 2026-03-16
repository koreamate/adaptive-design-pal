import { useState } from "react";
import { Search } from "lucide-react";

const suggestions = ["교육예산 추이", "국가채무", "추경", "지방교부세", "복지예산"];

const AISearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="space-y-3 max-w-[720px] mx-auto">
      <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-card border border-border shadow-lg">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary shrink-0 font-bold text-sm">
          AI
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="궁금한 재정정보를 물어보세요"
          className="flex-1 bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground outline-none"
        />
        <button className="p-2.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
          <Search className="w-5 h-5" />
        </button>
      </div>
      <div className="flex gap-2 flex-wrap items-center justify-center">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setQuery(s)}
            className="px-3 py-1.5 text-xs font-semibold rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all cursor-pointer"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AISearchBar;
