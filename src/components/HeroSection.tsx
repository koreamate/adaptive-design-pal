import { useState } from "react";
import { TrendingUp, TrendingDown, ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
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
  },
  {
    label: "총세입 현황",
    value: "497.8",
    unit: "조",
    change: "+1.8%",
    up: true,
    sub: "국세 422.1조 + 세외 75.7조",
  },
  {
    label: "총세출 현황",
    value: "558.0",
    unit: "조",
    change: "+2.5%",
    up: true,
    sub: "경상 412조 + 자본 146조",
  },
];

const irActivities = [
  { title: "2025년도 세입·세출 결산 보고서", date: "2026. 3. 15." },
  { title: "2025년 4분기 재정동향 보고", date: "2026. 1. 29." },
  { title: "2026년 예산안 편성 현황", date: "2025. 12. 10." },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const } },
};

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative overflow-hidden">
      {/* Full-screen Hero with photo background like JB Financial */}
      <div className="relative min-h-[92vh]">
        {/* Background image */}
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        {/* Dark blue overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(221,60%,18%,0.92)] via-[hsl(221,55%,22%,0.85)] to-[hsl(221,50%,28%,0.75)]" />
        {/* Geometric decorative shapes */}
        <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] border border-white/[0.06] rounded-3xl rotate-12" />
        <div className="absolute bottom-[15%] left-[15%] w-[200px] h-[200px] border border-white/[0.04] rounded-2xl -rotate-6" />
        <div className="absolute top-[20%] right-[40%] w-[150px] h-[150px] bg-white/[0.02] rounded-full blur-xl" />

        {/* Content */}
        <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 min-h-[92vh] flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-16">
            {/* Left: Large Typography */}
            <motion.div
              className="lg:col-span-5 flex flex-col justify-center"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 mb-8 w-fit">
                <span className="w-2 h-2 rounded-full bg-gov-green animate-pulse" />
                <span className="text-xs font-medium text-white/80">실시간 재정정보 업데이트</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                <span className="block">투명한</span>
                <span className="block">재정,</span>
                <span className="block text-white/60">열린 미래</span>
              </h1>

              <p className="text-base md:text-lg text-white/50 mb-10 max-w-md leading-relaxed">
                국가데이터로 보는 재정, 신뢰로 만드는 정책
              </p>

              {/* Tab buttons */}
              <div className="flex gap-2 mb-8">
                {tabs.map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(i)}
                    className={i === activeTab
                      ? "px-5 py-2.5 text-sm font-semibold rounded-full bg-white text-gov-blue transition-all shadow-lg shadow-white/10"
                      : "px-5 py-2.5 text-sm font-medium rounded-full text-white/70 hover:bg-white/10 border border-white/15 transition-all"
                    }
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Progress bar like JB */}
              <div className="flex items-center gap-3 mt-2">
                <div className="h-[3px] w-32 rounded-full bg-white/20 overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <span className="text-xs text-white/40 font-mono">01 / 03</span>
              </div>
            </motion.div>

            {/* Right: Floating Card Widgets */}
            <motion.div
              className="lg:col-span-7 flex flex-col gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Top row: KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {kpiData.map((kpi) => (
                  <motion.div
                    key={kpi.label}
                    variants={itemVariants}
                    className="relative rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.1] p-5 hover:bg-white/[0.12] transition-all group cursor-default"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-medium text-white/50 uppercase tracking-wider">{kpi.label}</span>
                      <span className={`inline-flex items-center gap-0.5 text-[11px] font-semibold px-2 py-0.5 rounded-full ${kpi.up ? "bg-gov-green/20 text-gov-green" : "bg-gov-red/20 text-gov-red"}`}>
                        {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {kpi.change}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-2xl md:text-3xl font-bold text-white">{kpi.value}</span>
                      <span className="text-base font-semibold text-white/40">{kpi.unit}</span>
                    </div>
                    <p className="text-[11px] text-white/30">{kpi.sub}</p>
                  </motion.div>
                ))}
              </div>

              {/* Bottom row: Chart + IR Activity */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {/* Chart card */}
                <motion.div
                  variants={itemVariants}
                  className="md:col-span-3 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.1] p-5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-white/80">연도별 세입 · 세출 추이</h3>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1 text-[10px] text-white/40">
                        <span className="w-2 h-2 rounded-sm bg-gov-blue" /> 세입
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-white/40">
                        <span className="w-2 h-2 rounded-sm bg-white/30" /> 세출
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-white/40">
                        <span className="w-2 h-2 rounded-sm bg-gov-red" /> 국가채무
                      </span>
                    </div>
                  </div>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} barCategoryGap="20%">
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                        <XAxis dataKey="year" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{
                            borderRadius: "12px",
                            border: "1px solid rgba(255,255,255,0.15)",
                            background: "rgba(30,40,70,0.95)",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                            fontSize: "12px",
                            color: "#fff",
                            padding: "10px 14px",
                          }}
                        />
                        <Bar dataKey="세입" fill="hsl(221 83% 53%)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="세출" fill="rgba(255,255,255,0.25)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="국가채무" fill="hsl(0 72% 51%)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* IR Activity card */}
                <motion.div
                  variants={itemVariants}
                  className="md:col-span-2 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.1] p-5 flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-gov-blue animate-pulse" />
                    <h3 className="text-sm font-semibold text-white/80">재정 공시</h3>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    {irActivities.map((item, i) => (
                      <button
                        key={i}
                        className="group flex items-start gap-3 py-3 border-b border-white/[0.06] last:border-0 hover:bg-white/[0.03] -mx-2 px-2 rounded-lg transition-all text-left"
                      >
                        <div className="flex-1">
                          <p className="text-[13px] font-medium text-white/70 group-hover:text-white transition-colors leading-snug">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-white/30 mt-1">{item.date}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 mt-0.5 transition-colors shrink-0" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* AI Search below hero */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <AISearchBar />
        </motion.div>
      </div>

      <div className="h-8 md:h-12" />
    </section>
  );
};

export default HeroSection;
