import { Move, X, ChevronRight } from "lucide-react";

const items = [
  { text: "2026년 예산 국회확정에 따른 정보 공개…", date: "2026.03.15" },
  { text: "2025 열린재정 사용자 설문조사 이벤트 당…", date: "2026.03.10" },
  { text: "2025년 열린재정 온라인모니터링단 모집", date: "2026.02.28" },
  { text: "2025년 상반기 국가결산 보고서 공개 안내", date: "2026.02.20" },
  { text: "지방재정 통합공개시스템 개편 사전 안내", date: "2026.02.15" },
  { text: "2024 회계연도 기금결산 주요 현황 발표", date: "2026.01.30" },
];

const RecentViewWidget = () => (
  <div className="gov-card p-4 h-full overflow-hidden">
    <div className="gov-widget-header">
      <button className="flex items-center gap-1 text-sm font-semibold text-foreground hover:text-gov-blue transition-colors">
        최근 열람 <ChevronRight className="w-4 h-4" />
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
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
          <span className="w-1.5 h-1.5 rounded-full bg-gov-blue shrink-0" />
          <span className="flex-1 line-clamp-1">{item.text}</span>
          <span className="text-[11px] text-muted-foreground/60 shrink-0">{item.date}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default RecentViewWidget;
