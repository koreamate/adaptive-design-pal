import { useState } from "react";
import { Search, Sparkles, ArrowRight } from "lucide-react";

const suggestions = ["교육예산 추이", "국가채무", "추경", "지방교부세", "복지예산"];

const AISearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/50 backdrop-blur-md border border-white/40 shadow-lg">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary shrink-0 shadow-md">
            <Sparkles className="w-4.5 h-4.5 text-primary-foreground" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="궁금한 재정정보를 AI에게 물어보세요"
            className="flex-1 bg-transparent text-sm font-medium text-foreground placeholder:text-foreground/40 outline-none"
          />
          <button className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm text-sm font-semibold flex items-center gap-1.5">
            검색
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap items-center">
        <span className="text-xs font-bold text-primary mr-1">추천 검색:</span>
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setQuery(s)}
            className="px-3 py-1.5 text-xs font-bold rounded-full bg-white/70 backdrop-blur-sm border border-foreground/15 text-foreground/80 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all cursor-pointer shadow-sm"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AISearchBar;
