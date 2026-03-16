import { Move, X, ChevronRight } from "lucide-react";
import playgroundThumb from "@/assets/playground-thumb.jpg";

const PlaygroundWidget = () => (
  <div className="gov-card p-5 h-full">
    <div className="gov-widget-header">
      <button className="flex items-center gap-1 text-sm font-semibold text-foreground hover:text-gov-blue transition-colors">
        나라살림 놀이터 <ChevronRight className="w-4 h-4" />
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
      <div className="aspect-[2/1] rounded-lg overflow-hidden border border-border mb-3 relative group">
        <img src={playgroundThumb} alt="나라살림 놀이터" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <p className="text-xs text-white/80 drop-shadow">스토리가 있는 재정</p>
          <p className="text-sm font-medium text-white drop-shadow">선거비 보전제도 편</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2">
        더 나은 사회를 만들기 위해 해결이 필요한 '현상'과 '문제'를 논리적으로 정의하고, 데이터를 기반으로 분석합니다.
      </p>
    </div>
  </div>
);

export default PlaygroundWidget;
