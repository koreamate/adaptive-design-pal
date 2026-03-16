import { useState } from "react";
import { TrendingUp, ArrowUpRight, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { ComposedChart, Bar, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import AISearchBar from "./AISearchBar";
import heroBg from "@/assets/hero-bg.jpg";

const tabs = ["중앙재정", "지방재정", "교육재정"];

const chartData = [
  { year: "2020", 세입: 48, 세출: 55, 국가채무: 85 },
  { year: "2021", 세입: 55, 세출: 60, 국가채무: 90 },
  { year: "2022", 세입: 62, 세출: 66, 국가채무: 95 },
  { year: "2023", 세입: 58, 세출: 64, 국가채무: 100 },
  { year: "2024", 세입: 50, 세출: 56, 국가채무: 107 },
  { year: "2025(E)", 세입: 50, 세출: 56, 국가채무: 113 },
];

const kpiData = [
  {
    label: "국가채무 (D1)",
    value: "1,126.9",
    unit: "조",
    change: "+3.2%",
    up: true,
    sub: "GDP 대비 49.8%",
    icon: "🏛️",
  },
  {
    label: "총세입 현황",
    value: "497.8",
    unit: "조",
    change: "+1.8%",
    up: true,
    sub: "국세 422.1조 + 세외 75.7조",
    icon: "📊",
  },
  {
    label: "총세출 현황",
    value: "558.0",
    unit: "조",
    change: "+2.5%",
    up: true,
    sub: "경상 412조 + 자본 146조",
    icon: "💰",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const } },
};

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative overflow-hidden">
      {/* Hero Background — full image, no gradient, no overlay */}
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
      
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 pt-10 md:pt-16 pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-gov-green animate-pulse" />
            <span className="text-xs font-medium text-white/80">실시간 재정정보 업데이트</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2 drop-shadow-lg">
            열린재정
          </h1>
          <p className="text-sm md:text-lg text-white/90 mb-8 max-w-xl drop-shadow-md">
            국가데이터로 보는 재정, 신뢰로 만드는 정책!
          </p>
          <div className="flex gap-2">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={i === activeTab
                  ? "px-4 py-2 text-sm font-semibold rounded-lg bg-white text-gov-blue transition-all shadow-md"
                  : "px-4 py-2 text-sm font-medium rounded-lg text-white hover:bg-white/20 border border-white/30 transition-all drop-shadow-sm"
                }
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* KPI + Chart Card (overlapping banner) */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 -mt-16 md:-mt-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-5 md:p-8 rounded-2xl bg-white/30 backdrop-blur-lg border border-white/30 shadow-xl"
        >
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 md:mb-8">
            {kpiData.map((kpi) => (
              <motion.div
                key={kpi.label}
                variants={itemVariants}
                className="relative p-4 md:p-5 rounded-xl bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm group hover:border-gov-blue/30 transition-all duration-300"
              >
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-gov-blue/5 to-transparent rounded-bl-3xl rounded-tr-xl" />
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{kpi.icon}</span>
                    <span className="text-xs font-semibold text-foreground">{kpi.label}</span>
                  </div>
                  <span className={kpi.up ? "gov-badge-up" : "gov-badge-down"}>
                    {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {kpi.change}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="gov-kpi-value">{kpi.value}</span>
                  <span className="text-lg font-bold text-foreground/70">{kpi.unit}</span>
                </div>
                <p className="text-xs font-medium text-foreground/60">{kpi.sub}</p>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-gov-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-1 h-5 rounded-full bg-primary" />
                <h3 className="text-sm font-bold text-foreground tracking-tight">연도별 세입 · 세출 추이</h3>
                <span className="text-[10px] text-foreground/60 bg-white/60 px-2 py-0.5 rounded-full font-semibold">단위: 조원</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-3 h-3 rounded-[3px] bg-primary shadow-sm" /> 세입
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-3 h-3 rounded-[3px]" style={{ background: "hsl(var(--gov-blue) / 0.35)" }} /> 세출
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-3 h-1 rounded-full bg-destructive" /> 국가채무
                </span>
              </div>
            </div>
            <div className="h-[260px] md:h-[320px] rounded-xl bg-muted/30 border border-border/50 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} barCategoryGap="25%" margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="barGradient1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.7} />
                    </linearGradient>
                    <linearGradient id="barGradient2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--gov-blue))" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(var(--gov-blue))" stopOpacity={0.15} />
                    </linearGradient>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity={0.08} />
                      <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))", fontWeight: 500 }}
                    axisLine={false}
                    tickLine={false}
                    dy={8}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={false}
                    tickLine={false}
                    dx={-4}
                  />
                  <Tooltip
                    cursor={{ fill: "hsl(var(--muted) / 0.5)", radius: 8 }}
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;
                      return (
                        <div className="bg-card border border-border rounded-xl shadow-lg p-4 min-w-[180px]">
                          <p className="text-xs font-bold text-foreground mb-2.5 pb-2 border-b border-border">{label}</p>
                          {payload.map((entry: any) => (
                            <div key={entry.dataKey} className="flex items-center justify-between py-1">
                              <span className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span
                                  className="w-2.5 h-2.5 rounded-full"
                                  style={{ background: entry.dataKey === '국가채무' ? 'hsl(var(--destructive))' : entry.color }}
                                />
                                {entry.dataKey}
                              </span>
                              <span className="text-xs font-semibold text-foreground">{entry.value}조</span>
                            </div>
                          ))}
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="세입" fill="url(#barGradient1)" radius={[8, 8, 2, 2]} barSize={28} />
                  <Bar dataKey="세출" fill="url(#barGradient2)" radius={[8, 8, 2, 2]} barSize={28} />
                  <Area type="monotone" dataKey="국가채무" fill="url(#areaGradient)" stroke="none" />
                  <Line
                    type="monotone"
                    dataKey="국가채무"
                    stroke="hsl(var(--destructive))"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "hsl(var(--card))", stroke: "hsl(var(--destructive))", strokeWidth: 2.5 }}
                    activeDot={{ r: 6, fill: "hsl(var(--destructive))", stroke: "hsl(var(--card))", strokeWidth: 3 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </motion.div>

        {/* AI Search */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 md:mt-8"
        >
          <AISearchBar />
        </motion.div>
      </div>
      
      {/* Bottom spacing */}
      <div className="h-8 md:h-12" />
    </section>
  );
};

export default HeroSection;
