import { useState } from "react";
import { Search, Sparkles, ArrowRight } from "lucide-react";

const suggestions = ["교육예산 추이", "국가채무", "추경", "지방교부세", "복지예산"];

const AISearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="gov-ai-search group">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-gov-blue to-gov-blue/80 shrink-0 shadow-md">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="궁금한 재정정보를 AI에게 물어보세요"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button className="p-2.5 rounded-xl bg-gov-blue text-white hover:bg-gov-blue/90 transition-colors shadow-sm">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-gov-blue/10 via-gov-blue/5 to-gov-blue/10 rounded-3xl blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="flex gap-2 flex-wrap">
        <span className="text-xs text-muted-foreground mr-1">추천 검색:</span>
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setQuery(s)}
            className="gov-tag hover:bg-gov-blue/5 hover:border-gov-blue/30 hover:text-gov-blue transition-all cursor-pointer"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AISearchBar;
