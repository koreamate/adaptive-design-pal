import { Move, X, ChevronRight, Star, TrendingUp, Landmark, BarChart3 } from "lucide-react";

const items = [
  { label: "우리나라 재정 현황", icon: Landmark, color: "gov-blue" },
  { label: "국민참여예산", icon: TrendingUp, color: "gov-green" },
  { label: "한국은행 100대 지표", icon: BarChart3, color: "gov-orange" },
];

const BookmarkWidget = () => (
  <div className="gov-card p-4 h-full overflow-hidden">
    <div className="gov-widget-header">
      <button className="flex items-center gap-1 text-sm font-semibold text-foreground hover:text-gov-blue transition-colors">
        즐겨찾기 <ChevronRight className="w-4 h-4" />
      </button>
      <div className="flex gap-1">
        <button className="p-1.5 rounded hover:bg-muted transition-colors">
          <Move className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
        <button className="p-1.5 rounded hover:bg-muted transition-colors">
          <X className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      </div>
    </div>
    <ul className="mt-4 space-y-2.5">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <li
            key={item.label}
            className="flex items-center gap-3 p-2.5 rounded-xl border border-border hover:border-gov-blue/30 hover:bg-muted/50 cursor-pointer transition-all group"
          >
            <div className={`w-9 h-9 rounded-lg bg-${item.color}/10 flex items-center justify-center shrink-0`}>
              <Icon className={`w-4 h-4 text-${item.color}`} />
            </div>
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors flex-1 line-clamp-1">
              {item.label}
            </span>
            <Star className="w-3.5 h-3.5 text-gov-orange fill-gov-orange shrink-0" />
          </li>
        );
      })}
    </ul>
  </div>
);

export default BookmarkWidget;
