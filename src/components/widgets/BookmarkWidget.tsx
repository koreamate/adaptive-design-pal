import { Move, X, ChevronRight, Star } from "lucide-react";

const items = ["우리나라 재정 현황", "국민참여예산", "한국은행 100대 지표"];

const BookmarkWidget = () => (
  <div className="gov-card p-5 h-full">
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
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
          <Star className="w-3.5 h-3.5 text-gov-orange fill-gov-orange" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default BookmarkWidget;
