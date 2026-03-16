import { useState } from "react";
import { TrendingUp, ArrowUpRight, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import AISearchBar from "./AISearchBar";


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
      {/* Hero Background — real photo */}
      <div className="relative bg-[hsl(221,50%,15%)]">
        <img src={heroPattern} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        
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
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2">
              열린재정
            </h1>
            <p className="text-sm md:text-lg text-white/70 mb-8 max-w-xl">
              국가데이터로 보는 재정, 신뢰로 만드는 정책!
            </p>
            <div className="flex gap-2">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={i === activeTab
                    ? "px-4 py-2 text-sm font-semibold rounded-lg bg-white text-gov-blue transition-all"
                    : "px-4 py-2 text-sm font-medium rounded-lg text-white/80 hover:bg-white/10 border border-white/20 transition-all"
                  }
                >
                  {tab}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-border" />
      </div>

      {/* KPI + Chart Card (overlapping banner) */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 -mt-16 md:-mt-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="gov-card p-5 md:p-8 border-0 shadow-xl"
        >
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 md:mb-8">
            {kpiData.map((kpi) => (
              <motion.div
                key={kpi.label}
                variants={itemVariants}
                className="relative p-4 md:p-5 rounded-xl bg-gradient-to-br from-muted/50 to-muted/20 border border-border group hover:border-gov-blue/30 transition-all duration-300"
              >
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-gov-blue/5 to-transparent rounded-bl-3xl rounded-tr-xl" />
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{kpi.icon}</span>
                    <span className="text-xs font-medium text-muted-foreground">{kpi.label}</span>
                  </div>
                  <span className={kpi.up ? "gov-badge-up" : "gov-badge-down"}>
                    {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {kpi.change}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="gov-kpi-value">{kpi.value}</span>
                  <span className="text-lg font-semibold text-muted-foreground">{kpi.unit}</span>
                </div>
                <p className="text-xs text-muted-foreground">{kpi.sub}</p>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-gov-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">연도별 세입 · 세출 추이</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="w-2.5 h-2.5 rounded-sm bg-gov-blue" /> 세입
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ background: "hsl(210 25% 75%)" }} /> 세출
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="w-2.5 h-2.5 rounded-sm bg-gov-red" /> 국가채무
                </span>
              </div>
            </div>
            <div className="h-[240px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" vertical={false} />
                  <XAxis dataKey="year" tick={{ fontSize: 12, fill: "hsl(215 16% 47%)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(215 16% 47%)" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid hsl(214 32% 91%)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                      fontSize: "12px",
                      padding: "12px 16px",
                    }}
                  />
                  <Bar dataKey="세입" fill="hsl(221 83% 53%)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="세출" fill="hsl(210 25% 75%)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="국가채무" fill="hsl(0 72% 51%)" radius={[6, 6, 0, 0]} />
                </BarChart>
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
