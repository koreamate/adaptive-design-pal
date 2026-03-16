import { Move, X, ChevronRight, TrendingUp, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";

const data = [
  { name: "세입", value: 497.8, change: 1.8, up: true },
  { name: "세출", value: 558.0, change: 2.5, up: true },
  { name: "국가채무", value: 1126.9, change: 3.2, up: true },
  { name: "재정수지", value: -60.2, change: -1.1, up: false },
];

const colors = [
  "hsl(221 83% 53%)",
  "hsl(210 25% 65%)",
  "hsl(0 72% 51%)",
  "hsl(25 95% 53%)",
];

const InterestStatsWidget = () => (
  <div className="gov-card p-4 h-full flex flex-col overflow-hidden">
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

    {/* Mini KPI row */}
    <div className="mt-4 grid grid-cols-2 gap-2 mb-4">
      {data.slice(0, 2).map((item, i) => (
        <div key={item.name} className="p-2.5 rounded-lg bg-muted/50 border border-border">
          <p className="text-[11px] text-muted-foreground mb-1">{item.name}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-bold text-foreground">{Math.abs(item.value)}</span>
            <span className="text-[10px] text-muted-foreground">조</span>
          </div>
          <span className={`inline-flex items-center gap-0.5 text-[10px] font-medium mt-0.5 ${item.up ? "text-gov-green" : "text-gov-red"}`}>
            {item.up ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
            {item.change > 0 ? "+" : ""}{item.change}%
          </span>
        </div>
      ))}
    </div>

    {/* Chart */}
    <p className="text-[11px] text-muted-foreground mb-2">전년 대비 변동 요약 (2024 → 2025)</p>
    <div className="flex-1 min-h-0" style={{ minHeight: "160px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap="25%">
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "hsl(215 16% 47%)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              border: "1px solid hsl(214 32% 91%)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              fontSize: "11px",
              padding: "8px 12px",
            }}
            formatter={(value: number) => [`${Math.abs(value)}조`, ""]}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default InterestStatsWidget;
