import { useState } from "react";
import { TrendingUp, TrendingDown, Calendar, ArrowRight, PieChart, BarChart3, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from "recharts";
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

const debtTrend = [
  { year: "20", value: 85 },
  { year: "21", value: 90 },
  { year: "22", value: 95 },
  { year: "23", value: 100 },
  { year: "24", value: 107 },
  { year: "25", value: 113 },
];

const kpiData = [
  {
    label: "국가채무 (D1)",
    value: "1,126.9",
    unit: "조원",
    change: "+3.2%",
    up: true,
    sub: "GDP 대비 49.8%",
    icon: Wallet,
    color: "bg-primary/10 text-primary",
  },
  {
    label: "총세입 현황",
    value: "497.8",
    unit: "조원",
    change: "+1.8%",
    up: true,
    sub: "국세 422.1조 + 세외 75.7조",
    icon: BarChart3,
    color: "bg-gov-green/10 text-gov-green",
  },
  {
    label: "총세출 현황",
    value: "558.0",
    unit: "조원",
    change: "+2.5%",
    up: true,
    sub: "경상 412조 + 자본 146조",
    icon: PieChart,
    color: "bg-gov-orange/10 text-gov-orange",
  },
];


const HeroSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-6 md:py-8">
        {/* Top bar: title + tabs + search */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5"
        >
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">재정 대시보드</h1>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gov-green/10 border border-gov-green/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-gov-green animate-pulse" />
                  <span className="text-[10px] font-medium text-gov-green">LIVE</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">2025년 3월 기준 · 국가데이터로 보는 재정, 신뢰로 만드는 정책</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={i === activeTab
                  ? "px-3 py-1.5 text-xs font-semibold rounded-md bg-primary text-primary-foreground transition-all"
                  : "px-3 py-1.5 text-xs font-medium rounded-md text-muted-foreground hover:bg-muted border border-border transition-all"
                }
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {/* KPI Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {kpiData.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <motion.div
                  key={kpi.label}
                  variants={itemVariants}
                  className="group relative rounded-xl border border-border bg-card p-4 hover:shadow-md hover:border-primary/20 transition-all duration-300 cursor-default"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg ${kpi.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${kpi.up ? "bg-gov-green/10 text-gov-green" : "bg-gov-red/10 text-gov-red"}`}>
                      {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {kpi.change}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5 mb-0.5">
                    <span className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{kpi.value}</span>
                    <span className="text-sm font-medium text-muted-foreground">{kpi.unit}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] text-muted-foreground">{kpi.sub}</p>
                    <span className="text-[10px] text-muted-foreground/60">{kpi.label}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Dashboard Grid: Chart + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Main Chart */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 rounded-xl border border-border bg-card p-4 md:p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">연도별 세입 · 세출 추이</h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                    <span className="w-2 h-2 rounded-sm bg-primary" /> 세입
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                    <span className="w-2 h-2 rounded-sm bg-muted-foreground/30" /> 세출
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                    <span className="w-2 h-2 rounded-sm bg-gov-red" /> 국가채무
                  </span>
                </div>
              </div>
              <div className="h-[220px] md:h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="year" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "10px",
                        border: "1px solid hsl(var(--border))",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                        fontSize: "12px",
                        padding: "10px 14px",
                        background: "hsl(var(--card))",
                      }}
                    />
                    <Bar dataKey="세입" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="세출" fill="hsl(var(--muted-foreground) / 0.3)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="국가채무" fill="hsl(var(--gov-red))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Sidebar: Debt Trend + Quick Stats */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              {/* Mini trend chart */}
              <div className="rounded-xl border border-border bg-card p-4 flex-1">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gov-red" />
                    <h3 className="text-xs font-semibold text-foreground">국가채무 추이</h3>
                  </div>
                  <span className="text-[10px] text-muted-foreground">단위: 조원</span>
                </div>
                <div className="h-[100px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={debtTrend}>
                      <defs>
                        <linearGradient id="debtGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--gov-red))" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="hsl(var(--gov-red))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="year" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                      <Area type="monotone" dataKey="value" stroke="hsl(var(--gov-red))" strokeWidth={2} fill="url(#debtGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Quick stats */}
              <div className="rounded-xl border border-border bg-card p-4 flex-1">
                <h3 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  주요 재정 일정
                </h3>
                <div className="space-y-2.5">
                  {[
                    { date: "03.20", title: "2025년 추경 편성안 발표", tag: "예산" },
                    { date: "03.25", title: "1분기 재정동향 보고", tag: "보고" },
                    { date: "04.01", title: "지방교부세 배분 확정", tag: "교부" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center gap-3 group cursor-default">
                      <span className="text-[11px] font-mono font-medium text-muted-foreground w-10 shrink-0">{item.date}</span>
                      <span className="text-xs text-foreground group-hover:text-primary transition-colors flex-1 truncate">{item.title}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{item.tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* AI Search */}
          <motion.div variants={itemVariants}>
            <AISearchBar />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
