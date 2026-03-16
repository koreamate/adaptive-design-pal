import { useState } from "react";
import { TrendingUp, TrendingDown, ArrowRight, Sparkles, Search } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import heroBg from "@/assets/hero-bg.jpg";

const tabs = ["중앙재정", "지방재정", "교육재정"];

const suggestions = ["교육예산 추이", "국가채무", "추경", "지방교부세", "복지예산"];

const chartData = [
  { year: "2020", 세입: 48, 세출: 55, 국가채무: 85 },
  { year: "2021", 세입: 55, 세출: 60, 국가채무: 90 },
  { year: "2022", 세입: 62, 세출: 66, 국가채무: 95 },
  { year: "2023", 세입: 58, 세출: 64, 국가채무: 100 },
  { year: "2024", 세입: 50, 세출: 56, 국가채무: 107 },
  { year: "2025(E)", 세입: 50, 세출: 56, 국가채무: 113 },
];

const kpiData = [
  { label: "국가채무 (D1)", value: "1,126.9", unit: "조", change: "+3.2%", up: true, sub: "GDP 대비 49.8%" },
  { label: "총세입 현황", value: "497.8", unit: "조", change: "+1.8%", up: true, sub: "국세 422.1조 + 세외 75.7조" },
  { label: "총세출 현황", value: "558.0", unit: "조", change: "+2.5%", up: true, sub: "경상 412조 + 자본 146조" },
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
  const [query, setQuery] = useState("");

  return (
    <section className="relative overflow-hidden">
      {/* Full Hero with background image */}
      <div className="relative min-h-[94vh]">
        {/* Background */}
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(221,70%,12%,0.4)] via-[hsl(221,60%,15%,0.3)] to-[hsl(221,60%,12%,0.6)]" />

        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(221,70%,8%,0.5)_100%)]" />

        {/* Content */}
        <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 min-h-[94vh] flex flex-col">
          
          {/* Top: Title + Search (centered) */}
          <div className="flex-1 flex flex-col items-center justify-center pt-8 pb-4">
            <motion.div
              className="text-center max-w-3xl w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 mb-6">
                <span className="w-2 h-2 rounded-full bg-gov-green animate-pulse" />
                <span className="text-xs font-medium text-white/80">실시간 재정정보 업데이트</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
                투명한 재정, <span className="text-white/60">열린 미래</span>
              </h1>
              <p className="text-base md:text-lg text-white/50 mb-10">
                국가데이터로 보는 재정, 신뢰로 만드는 정책
              </p>

              {/* AI Search Bar — prominent inside hero */}
              <motion.div
                className="w-full max-w-2xl mx-auto mb-5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="relative flex items-center gap-3 bg-white/[0.12] backdrop-blur-2xl border border-white/[0.18] rounded-2xl px-5 py-3 shadow-2xl shadow-black/20 focus-within:bg-white/[0.18] focus-within:border-white/[0.3] transition-all">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-gov-blue to-gov-blue/80 shrink-0 shadow-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="궁금한 재정정보를 AI에게 물어보세요"
                    className="flex-1 bg-transparent text-base text-white placeholder:text-white/40 outline-none"
                  />
                  <button className="p-3 rounded-xl bg-white text-gov-blue hover:bg-white/90 transition-colors shadow-md">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>

              {/* Suggestion tags */}
              <motion.div
                className="flex gap-2 flex-wrap justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <span className="text-xs text-white/40 mr-1 leading-7">추천 검색</span>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-3 py-1 text-xs font-medium text-white/60 bg-white/[0.08] border border-white/[0.12] rounded-full hover:bg-white/[0.15] hover:text-white/90 hover:border-white/25 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </motion.div>

              {/* Tab buttons */}
              <motion.div
                className="flex gap-2 justify-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {tabs.map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(i)}
                    className={i === activeTab
                      ? "px-5 py-2 text-sm font-semibold rounded-full bg-white text-gov-blue transition-all shadow-lg shadow-white/10"
                      : "px-5 py-2 text-sm font-medium rounded-full text-white/60 hover:bg-white/10 border border-white/15 transition-all"
                    }
                  >
                    {tab}
                  </button>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom: KPI + Chart + IR Cards */}
          <motion.div
            className="pb-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
              {/* KPI Cards */}
              {kpiData.map((kpi) => (
                <motion.div
                  key={kpi.label}
                  variants={itemVariants}
                  className="lg:col-span-2 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.1] p-4 hover:bg-white/[0.12] transition-all cursor-default"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-medium text-white/50 tracking-wider">{kpi.label}</span>
                    <span className={`inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${kpi.up ? "bg-gov-green/20 text-gov-green" : "bg-gov-red/20 text-gov-red"}`}>
                      {kpi.up ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                      {kpi.change}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl md:text-2xl font-bold text-white">{kpi.value}</span>
                    <span className="text-sm font-semibold text-white/40">{kpi.unit}</span>
                  </div>
                  <p className="text-[10px] text-white/30 mt-1">{kpi.sub}</p>
                </motion.div>
              ))}

              {/* Chart */}
              <motion.div
                variants={itemVariants}
                className="lg:col-span-4 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.1] p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-white/80">세입 · 세출 추이</h3>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[9px] text-white/40">
                      <span className="w-1.5 h-1.5 rounded-sm bg-gov-blue" /> 세입
                    </span>
                    <span className="inline-flex items-center gap-1 text-[9px] text-white/40">
                      <span className="w-1.5 h-1.5 rounded-sm bg-white/30" /> 세출
                    </span>
                    <span className="inline-flex items-center gap-1 text-[9px] text-white/40">
                      <span className="w-1.5 h-1.5 rounded-sm bg-gov-red" /> 채무
                    </span>
                  </div>
                </div>
                <div className="h-[140px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barCategoryGap="20%">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                      <XAxis dataKey="year" tick={{ fontSize: 9, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 9, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "10px",
                          border: "1px solid rgba(255,255,255,0.15)",
                          background: "rgba(30,40,70,0.95)",
                          fontSize: "11px",
                          color: "#fff",
                          padding: "8px 12px",
                        }}
                      />
                      <Bar dataKey="세입" fill="hsl(221 83% 53%)" radius={[3, 3, 0, 0]} />
                      <Bar dataKey="세출" fill="rgba(255,255,255,0.25)" radius={[3, 3, 0, 0]} />
                      <Bar dataKey="국가채무" fill="hsl(0 72% 51%)" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* IR Activity */}
              <motion.div
                variants={itemVariants}
                className="lg:col-span-2 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/[0.1] p-4 flex flex-col"
              >
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gov-blue animate-pulse" />
                  <h3 className="text-xs font-semibold text-white/80">재정 공시</h3>
                </div>
                <div className="flex-1 flex flex-col">
                  {irActivities.map((item, i) => (
                    <button
                      key={i}
                      className="group flex items-start gap-2 py-2 border-b border-white/[0.06] last:border-0 text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-medium text-white/60 group-hover:text-white transition-colors leading-snug truncate">
                          {item.title}
                        </p>
                        <p className="text-[9px] text-white/25 mt-0.5">{item.date}</p>
                      </div>
                      <ArrowRight className="w-3 h-3 text-white/15 group-hover:text-white/50 mt-0.5 shrink-0 transition-colors" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
