import { Move, X, ChevronRight } from "lucide-react";
import newsThumb from "@/assets/news-thumb.jpg";

const NewsfeedWidget = () => (
  <div className="gov-card p-4 h-full overflow-hidden">
    <div className="gov-widget-header">
      <button className="flex items-center gap-1 text-sm font-semibold text-foreground hover:text-gov-blue transition-colors">
        재정 뉴스피드 <ChevronRight className="w-4 h-4" />
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
    <div className="mt-4">
      <div className="aspect-[3/1] rounded-lg overflow-hidden border border-border mb-3 relative group">
        <img src={newsThumb} alt="뉴스 이미지" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <h4 className="text-sm font-semibold text-foreground mb-1">
        2025년 하반기 재정데이터분석 미니 프로젝트
      </h4>
      <p className="text-xs text-muted-foreground line-clamp-2">
        더 나은 사회를 만들기 위해 해결이 필요한 '현상'과 '문제'를 논리적으로 정의하고, 데이터를 기반으로 분석합니다.
      </p>
    </div>
  </div>
);

export default NewsfeedWidget;
