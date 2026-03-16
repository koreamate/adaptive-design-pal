import { useState } from "react";
import { ChevronLeft, ChevronRight, BarChart3, DollarSign, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import AISearchBar from "./AISearchBar";
import heroIllustration from "@/assets/hero-illustration.png";

const tabs = ["중앙재정", "지방재정", "교육재정"];

const miniChartData = [
  { year: "20", 세입: 48, 세출: 55 },
  { year: "21", 세입: 55, 세출: 60 },
  { year: "22", 세입: 62, 세출: 66 },
  { year: "23", 세입: 58, 세출: 64 },
  { year: "24", 세입: 50, 세출: 56 },
];

const kpiData = [
  {
    label: "국가채무 (D1)",
    value: "1,126.9",
    unit: "조",
    sub: "GDP 대비 49.8%",
    change: "+3.2%",
    icon: BarChart3,
  },
  {
    label: "국가채무 (D1)",
    value: "1,126.9",
    unit: "조",
    sub: "GDP 대비 49.8%",
    change: "+3.2%",
    icon: DollarSign,
  },
];

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted to-muted/60">
      {/* Title + Tabs */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 pt-8 md:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight mb-1">
            열린재정
          </h1>
          <p className="text-xs md:text-sm font-medium text-muted-foreground mb-6">
            국가데이터로 보는 재정, 신뢰로 만드는 정책!
          </p>
        </motion.div>

        {/* Centered Tabs */}
        <div className="flex justify-center gap-6 mb-8">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`text-sm md:text-base font-bold pb-1 border-b-2 transition-all ${
                i === activeTab
                  ? "text-foreground border-foreground"
                  : "text-muted-foreground border-transparent hover:text-foreground/70"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: Illustration + KPIs */}
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8">
        {/* Carousel Arrows */}
        <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-muted-foreground/50 hover:text-foreground transition-colors">
          <ChevronLeft className="w-10 h-10" />
        </button>
        <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-muted-foreground/50 hover:text-foreground transition-colors">
          <ChevronRight className="w-10 h-10" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center px-8 md:px-16">
          {/* Left: Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center"
          >
            <img
              src={heroIllustration}
              alt="재정 대시보드 일러스트"
              className="w-full max-w-[480px] h-auto drop-shadow-lg"
            />
          </motion.div>

          {/* Right: KPI Cards + Mini Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center md:items-start gap-5"
          >
            {/* KPI Cards */}
            {kpiData.map((kpi, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl border border-border bg-card flex items-center justify-center shadow-sm">
                  <kpi.icon className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-0.5">{kpi.label}</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl md:text-3xl font-extrabold text-foreground">{kpi.value}</span>
                    <span className="text-base font-bold text-foreground/60">{kpi.unit}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-muted-foreground">{kpi.sub}</span>
                    <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-primary">
                      <TrendingUp className="w-3 h-3" />
                      {kpi.change}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Mini Chart */}
            <div className="mt-2 w-full max-w-[320px]">
              <h4 className="text-sm font-bold text-foreground text-center mb-3">연도별 세입·세출 추이</h4>
              <div className="h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={miniChartData} barCategoryGap="25%">
                    <XAxis
                      dataKey="year"
                      tick={{ fontSize: 10, fill: "hsl(215, 16%, 47%)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis hide />
                    <Bar dataKey="세입" radius={[2, 2, 0, 0]} barSize={14}>
                      {miniChartData.map((_, i) => (
                        <Cell key={i} fill="hsl(221, 83%, 53%)" />
                      ))}
                    </Bar>
                    <Bar dataKey="세출" radius={[2, 2, 0, 0]} barSize={14}>
                      {miniChartData.map((_, i) => (
                        <Cell key={i} fill="hsl(0, 72%, 51%)" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* AI Search */}
      <div className="max-w-[700px] mx-auto px-5 md:px-8 mt-8 mb-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          <AISearchBar />
        </motion.div>
      </div>

      <div className="h-6 md:h-10" />
    </section>
  );
};

export default HeroSection;
