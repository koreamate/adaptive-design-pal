import { useState } from "react";
import { TrendingUp, ArrowUpRight, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { ComposedChart, Bar, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";
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
      <div className="absolute inset-0 bg-black/15" />
      
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 pt-10 md:pt-16 pb-10 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-2 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
              열린재정
            </h1>
            <p className="text-sm md:text-lg font-semibold text-foreground/70 mb-4 max-w-xl drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">
              국가데이터로 보는 재정, 신뢰로 만드는 정책!
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-gov-green animate-pulse" />
              <span className="text-xs font-semibold text-primary">실시간 재정정보 업데이트</span>
            </div>
            <div className="flex gap-2">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={i === activeTab
                    ? "px-5 py-2.5 text-sm font-bold rounded-lg bg-primary text-primary-foreground transition-all shadow-md"
                    : "px-5 py-2.5 text-sm font-semibold rounded-lg text-foreground/70 bg-white/50 hover:bg-white/70 border border-foreground/10 backdrop-blur-sm transition-all"
                  }
                >
                  {tab}
                </button>
              ))}
            </div>
        </motion.div>
      </div>

      {/* KPI + Chart — no box, blended with background */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 mt-0 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 md:mb-8">
            {kpiData.map((kpi) => (
              <motion.div
                key={kpi.label}
                variants={itemVariants}
                className="relative p-4 md:p-5 rounded-xl border border-white/30 bg-white/20 backdrop-blur-md group hover:bg-white/35 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{kpi.icon}</span>
                    <span className="text-xs font-bold text-white drop-shadow-sm">{kpi.label}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-white/20 text-white border border-white/20">
                    {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {kpi.change}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-md">{kpi.value}</span>
                  <span className="text-lg font-bold text-white/70">{kpi.unit}</span>
                </div>
                <p className="text-xs font-medium text-white/60">{kpi.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 rounded-full bg-white/60" />
                <h3 className="text-base font-bold text-white drop-shadow-sm tracking-tight">연도별 세입 · 세출 추이</h3>
                <span className="text-[10px] text-white/60 bg-white/15 px-2.5 py-1 rounded-full font-semibold border border-white/20">단위: 조원</span>
              </div>
              <div className="flex items-center gap-5">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-white/90">
                  <span className="w-3.5 h-3.5 rounded-sm" style={{ background: "hsl(221, 83%, 65%)" }} /> 세입
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-white/90">
                  <span className="w-3.5 h-3.5 rounded-sm" style={{ background: "hsl(210, 70%, 78%)" }} /> 세출
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-white/90">
                  <span className="w-5 h-[3px] rounded-full bg-white/80" /> 국가채무
                </span>
              </div>
            </div>
            <div className="h-[280px] md:h-[340px] rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 p-5">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} barCategoryGap="30%" margin={{ top: 20, right: 16, left: -4, bottom: 4 }}>
                  <defs>
                    <linearGradient id="barGradient1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(221, 83%, 65%)" stopOpacity={0.95} />
                      <stop offset="100%" stopColor="hsl(221, 83%, 65%)" stopOpacity={0.5} />
                    </linearGradient>
                    <linearGradient id="barGradient2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(210, 70%, 78%)" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="hsl(210, 70%, 78%)" stopOpacity={0.4} />
                    </linearGradient>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="white" stopOpacity={0.1} />
                      <stop offset="80%" stopColor="white" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 6" stroke="rgba(255,255,255,0.12)" vertical={false} />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 12, fill: "rgba(255,255,255,0.6)", fontWeight: 600 }}
                    axisLine={{ stroke: "rgba(255,255,255,0.15)", strokeWidth: 1 }}
                    tickLine={false}
                    dy={10}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "rgba(255,255,255,0.5)" }}
                    axisLine={false}
                    tickLine={false}
                    dx={-6}
                    tickFormatter={(v) => `${v}`}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.06)", radius: 12 }}
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;
                      const colorMap: Record<string, string> = {
                        '세입': 'hsl(221, 83%, 65%)',
                        '세출': 'hsl(210, 70%, 78%)',
                        '국가채무': 'rgba(255,255,255,0.8)',
                      };
                      return (
                        <div className="bg-foreground/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-5 min-w-[200px]">
                          <p className="text-sm font-bold text-white mb-3 pb-2.5 border-b border-white/15">{label}년</p>
                          {payload.map((entry: any) => (
                            <div key={entry.dataKey} className="flex items-center justify-between py-1.5">
                              <span className="flex items-center gap-2.5 text-xs font-medium text-white/60">
                                <span
                                  className="w-3 h-3 rounded-full"
                                  style={{ background: colorMap[entry.dataKey] || entry.color }}
                                />
                                {entry.dataKey}
                              </span>
                              <span className="text-sm font-bold text-white">{entry.value}<span className="text-xs font-normal text-white/50 ml-0.5">조</span></span>
                            </div>
                          ))}
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="세입" fill="url(#barGradient1)" radius={[2, 2, 0, 0]} barSize={32}>
                    <LabelList dataKey="세입" position="top" fontSize={10} fontWeight={700} fill="rgba(255,255,255,0.7)" formatter={(v: number) => v} />
                  </Bar>
                  <Bar dataKey="세출" fill="url(#barGradient2)" radius={[2, 2, 0, 0]} barSize={32}>
                    <LabelList dataKey="세출" position="top" fontSize={10} fontWeight={700} fill="rgba(255,255,255,0.6)" formatter={(v: number) => v} />
                  </Bar>
                  <Area type="monotone" dataKey="국가채무" fill="url(#areaGradient)" stroke="none" />
                  <Line
                    type="monotone"
                    dataKey="국가채무"
                    stroke="rgba(255,255,255,0.7)"
                    strokeWidth={3}
                    dot={{ r: 5, fill: "rgba(255,255,255,0.15)", stroke: "rgba(255,255,255,0.7)", strokeWidth: 3 }}
                    activeDot={{ r: 7, fill: "rgba(255,255,255,0.8)", stroke: "white", strokeWidth: 3 }}
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
