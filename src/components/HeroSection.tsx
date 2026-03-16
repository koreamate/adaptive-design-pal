import { useState } from "react";
import { TrendingUp, ArrowUpRight } from "lucide-react";
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
    <section className="py-8 md:py-12 px-5 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Title + Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 md:mb-8"
        >
          <h1 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight mb-1">
            열린재정
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mb-6">
            국가데이터로 보는 재정, 신뢰로 만드는 정책!
          </p>
          <div className="flex gap-2">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={i === activeTab ? "gov-tab-active" : "gov-tab"}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* KPI Cards + Chart */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="gov-card p-5 md:p-8"
        >
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 md:mb-8">
            {kpiData.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                variants={itemVariants}
                className="p-4 md:p-5 rounded-xl bg-muted/50 border border-border"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground">{kpi.label}</span>
                  <span className="gov-badge-up">
                    <TrendingUp className="w-3 h-3" />
                    {kpi.change}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="gov-kpi-value">{kpi.value}</span>
                  <span className="text-lg font-semibold text-muted-foreground">{kpi.unit}</span>
                </div>
                <p className="text-xs text-muted-foreground">{kpi.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-semibold text-foreground mb-4">연도별 세입 · 세출 추이</h3>
            <div className="h-[240px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
                  <XAxis dataKey="year" tick={{ fontSize: 12, fill: "hsl(215 16% 47%)" }} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(215 16% 47%)" }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid hsl(214 32% 91%)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      fontSize: "12px",
                    }}
                  />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: "12px" }} />
                  <Bar dataKey="세입" fill="hsl(221 83% 53%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="세출" fill="hsl(210 25% 75%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="국가채무" fill="hsl(0 72% 51%)" radius={[4, 4, 0, 0]} />
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
    </section>
  );
};

export default HeroSection;
