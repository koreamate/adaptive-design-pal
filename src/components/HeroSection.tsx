import { useState } from "react";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { ComposedChart, Bar, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import AISearchBar from "./AISearchBar";
import heroIllustration from "@/assets/hero-illustration.png";

const tabs = ["중앙재정", "지방재정", "교육재정"];

const chartData = [
  { year: "20", 세입: 48, 세출: 55, 국가채무: 85 },
  { year: "21", 세입: 55, 세출: 60, 국가채무: 90 },
  { year: "22", 세입: 62, 세출: 66, 국가채무: 95 },
  { year: "23", 세입: 58, 세출: 64, 국가채무: 100 },
  { year: "24", 세입: 50, 세출: 56, 국가채무: 107 },
  { year: "25", 세입: 50, 세출: 56, 국가채무: 113 },
];

const kpiData = [
  {
    label: "국가채무",
    value: "1,126.9",
    unit: "조",
    change: "+3.2%",
    sub: "GDP 대비 49.8%",
    icon: "🏛️",
  },
  {
    label: "총세입 현황",
    value: "497.8",
    unit: "조",
    change: "+1.8%",
    sub: "국세 422.1조 + 세외 75.7조",
    icon: "📊",
  },
  {
    label: "총 세출현황",
    value: "558.0",
    unit: "조",
    change: "+2.5%",
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
    <section className="relative overflow-hidden bg-gradient-to-br from-gov-navy via-primary to-gov-navy">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(0 0% 100%) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      {/* Gradient glow accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gov-blue/15 blur-[100px]" />

      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8">
        {/* Tabs - top center */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center gap-3 pt-8 pb-6"
        >
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={i === activeTab
                ? "px-8 py-3 text-sm font-bold rounded-lg bg-white/20 text-white shadow-md backdrop-blur-sm border border-white/20 transition-all"
                : "px-8 py-3 text-sm font-semibold rounded-lg text-white/70 bg-white/5 border border-white/10 hover:border-white/30 hover:text-white transition-all"
              }
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Title */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="mb-6 mt-5">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
              열린재정
            </h1>
            <p className="text-sm md:text-base font-semibold text-white/70 max-w-md mt-5">
              국가데이터로 보는 재정, 신뢰로 만드는 정책!
            </p>
          </motion.div>
        </motion.div>

        {/* Two-column layout - illustration & KPIs aligned */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 pb-8 items-center lg:-ml-10"
        >
          {/* Left: Illustration */}
          <motion.div variants={itemVariants} className="flex items-center justify-center">
            <img
              src={heroIllustration}
              alt="재정 데이터 분석 일러스트"
              className="w-full max-w-[500px] h-auto object-contain"
            />
          </motion.div>

          {/* Right: KPIs + Chart */}
          <motion.div variants={itemVariants} className="w-full max-w-[calc(100%-40px)] lg:-ml-10">
            {/* KPI Cards - stacked vertically */}
            <div className="space-y-3 mb-6">
              {kpiData.map((kpi) => (
                <div
                  key={kpi.label}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xl shadow-sm hover:bg-white/15 transition-all"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 text-2xl shrink-0">
                    {kpi.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white/60 mb-0.5">{kpi.label}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl md:text-3xl font-extrabold text-white">{kpi.value}</span>
                      <span className="text-base font-bold text-white/60">{kpi.unit}</span>
                    </div>
                    <p className="text-[11px] text-white/50 mt-0.5">{kpi.sub}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-gov-orange">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {kpi.change}
                  </span>
                </div>
              ))}
            </div>

            {/* Mini Chart */}
            <div>
              <h3 className="text-sm font-bold text-white mb-3">연도별 세입·세출 추이</h3>
              <div className="h-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData} barCategoryGap="25%" margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
                    <XAxis
                      dataKey="year"
                      tick={{ fontSize: 11, fill: "rgba(255,255,255,0.5)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis hide />
                    <Bar dataKey="세입" fill="rgba(255,255,255,0.7)" radius={[2, 2, 0, 0]} barSize={20} />
                    <Bar dataKey="세출" fill="rgba(255,255,255,0.35)" radius={[2, 2, 0, 0]} barSize={20} />
                    <Line
                      type="monotone"
                      dataKey="국가채무"
                      stroke="hsl(var(--gov-green))"
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: "hsl(var(--gov-green))", strokeWidth: 0 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Navigation arrows */}
        <button className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-muted-foreground/50 hover:text-foreground transition-colors hidden lg:block">
          <ChevronLeft className="w-10 h-10" strokeWidth={1.5} />
        </button>
        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-muted-foreground/50 hover:text-foreground transition-colors hidden lg:block">
          <ChevronRight className="w-10 h-10" strokeWidth={1.5} />
        </button>

        {/* AI Search */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="pb-10"
        >
          <AISearchBar />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
