import { useState } from "react";
import { Search, Sparkles, Send } from "lucide-react";

const suggestions = ["교육예산 추이", "국가채무", "추경", "지방교부세", "복지예산"];

const AISearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="space-y-3 max-w-[720px] mx-auto">
      <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-card border border-border shadow-lg">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-gov-blue shrink-0 shadow-sm">
          <Sparkles className="w-5 h-5 text-primary-foreground" strokeWidth={2} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="궁금한 재정정보를 물어보세요"
          className="flex-1 bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground outline-none"
        />
        <button className="p-2.5 rounded-full text-muted-foreground hover:text-primary transition-colors">
          <Send className="w-[21px] h-[21px]" strokeWidth={2} />
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
