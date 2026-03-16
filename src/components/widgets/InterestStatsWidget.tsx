import { Move, X, ChevronRight } from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

const data = [
  { name: "A", v: 50000 },
  { name: "B", v: 80000 },
  { name: "C", v: 60000 },
  { name: "D", v: 40000 },
];

const InterestStatsWidget = () => (
  <div className="gov-card p-5 h-full">
    <div className="gov-widget-header">
      <button className="flex items-center gap-1 text-sm font-semibold text-foreground hover:text-gov-blue transition-colors">
        관심 통계 <ChevronRight className="w-4 h-4" />
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
      <p className="text-xs text-muted-foreground mb-3">전년 대비 변동 요약 (2024 → 2025)</p>
      <div className="h-[140px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(215 16% 47%)" }} />
            <Bar dataKey="v" fill="hsl(152 69% 40%)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default InterestStatsWidget;
