import { motion } from "framer-motion";
import { ChevronRight, Play, ArrowUpRight, Bell, BarChart3, Users, Sparkles } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] as const } },
};

const storyCards = [
  {
    title: "스토리가 있는 재정 – 지방재정조정제도 편",
    desc: "지방재정조정제도는 중앙정부 재원의 일부를 지방자치단체에 교부하여 재정력이 취약한 지방자치…",
    tags: ["#연금", "#노후소득"],
  },
  {
    title: "스토리가 있는 재정 – 지방재정조정제도 편",
    desc: "지방재정조정제도는 중앙정부 재원의 일부를 지방자치단체에 교부하여 재정력이 취약한 지방자치…",
    tags: ["#지방재정", "#자치단체"],
  },
  {
    title: "E-재정배움",
    desc: "열린재정부터 참여예산까지 나라살림, 나도 참여할 수 있다!",
    tags: ["#열린재정", "#국민참여"],
    isNew: true,
    isVideo: true,
  },
];

const notices = [
  "2025 회계연도 총세입·총세출 마감 발표",
  "열린재정 생성형 AI [열린재정, 열린질문] 으로…",
  "[당첨자 발표] 내가 바로 「열린재정, 열린질문」…",
  "2026년 예산 국회확정에 따른 정보 공개 안내",
];

const ContentSection = () => {
  return (
    <section className="py-8 md:py-12 px-5 md:px-8">
      <div className="max-w-[1400px] mx-auto space-y-10 md:space-y-14">
        {/* 3-Column Story Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {["국민관심 재정정보", "나라살림 놀이터", "재정교실 이야기"].map((title, i) => (
              <div key={title} className="flex items-center justify-between">
                <h3 className="gov-section-title">{title}</h3>
                <button className="gov-link flex items-center gap-0.5">
                  더보기 <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {storyCards.map((card, i) => (
              <motion.div key={i} variants={itemVariants} className="gov-content-card">
                <div className="aspect-[16/10] bg-muted/50 flex items-center justify-center relative">
                  {card.isVideo && (
                    <div className="w-12 h-12 rounded-full bg-gov-orange flex items-center justify-center">
                      <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                    </div>
                  )}
                  {card.isNew && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-gov-orange text-primary-foreground text-[10px] font-bold rounded">
                      NEW
                    </span>
                  )}
                  {!card.isVideo && (
                    <span className="text-xs text-muted-foreground">IMG</span>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2 line-clamp-1">{card.title}</h4>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{card.desc}</p>
                  <div className="flex gap-2">
                    {card.tags.map((tag) => (
                      <span key={tag} className="gov-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Grid: 공지사항 + 재정지표 대시보드 + Quick Actions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* 공지사항 */}
          <motion.div variants={itemVariants} className="gov-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground">공지사항</h3>
              <button className="gov-link flex items-center gap-0.5 text-xs">
                더보기 <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <ul className="space-y-3">
              {notices.map((n, i) => (
                <li key={i} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors line-clamp-1">
                  {n}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 재정지표 대시보드 */}
          <motion.div variants={itemVariants} className="gov-card p-5">
            <h3 className="text-base font-semibold text-foreground mb-2">재정지표 대시보드</h3>
            <p className="text-xs text-muted-foreground mb-4">주요 재정지표를 다양한 통계 그래프로 한 눈에 확인하세요.</p>
            <div className="aspect-square rounded-xl bg-muted/50 border border-border flex items-center justify-center">
              <BarChart3 className="w-10 h-10 text-muted-foreground/40" />
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="gov-card p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gov-blue/10 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-gov-blue" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">참여예산 퀵 가드</h4>
                  <p className="text-xs text-muted-foreground mb-2">국민의 아이디어로 예산을 바꿉니다.</p>
                  <button className="gov-link flex items-center gap-0.5 text-xs">
                    참여하기 <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
            <div className="gov-card p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gov-green/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-gov-green" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">수혜서비스 퀵 검색</h4>
                  <p className="text-xs text-muted-foreground mb-2">AI 매칭으로 나에게 맞는 서비스를 추천해 드려요.</p>
                  <button className="gov-link flex items-center gap-0.5 text-xs">
                    나의 수혜서비스 찾기 <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContentSection;
