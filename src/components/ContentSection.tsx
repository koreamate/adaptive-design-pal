import { motion } from "framer-motion";
import { ChevronRight, Play, ArrowUpRight, Bell, BarChart3, Users, Sparkles } from "lucide-react";
import storyImg1 from "@/assets/story-card-1.jpg";
import storyImg2 from "@/assets/story-card-2.jpg";
import storyImg3 from "@/assets/story-card-3.jpg";
import dashboardImg from "@/assets/dashboard-preview.jpg";

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
    desc: "우리나라는 빠르게 고령사회에 진입했지만, 많은 어르신들이 노후 준비가 부족하여 경제적 어려…",
    tags: ["#연금", "#노후소득"],
    image: storyImg1,
  },
  {
    title: "스토리가 있는 재정 – 지방재정조정제도 편",
    desc: "지방재정조정제도는 중앙정부 재원의 일부를 지방자치단체에 교부하여 재정력이 취약한 지방자치…",
    tags: ["#지방재정", "#자치단체"],
    image: storyImg2,
  },
  {
    title: "E-재정배움",
    desc: "열린재정부터 참여예산까지 나라살림, 나도 참여할 수 있다!",
    tags: ["#열린재정", "#국민참여"],
    isNew: true,
    isVideo: true,
    image: storyImg3,
  },
];

const notices = [
  { text: "2025 회계연도 총세입·총세출 마감 발표", date: "03.10" },
  { text: "열린재정 생성형 AI [열린재정, 열린질문] 으로…", date: "03.05" },
  { text: "[당첨자 발표] 내가 바로 「열린재정, 열린질문」…", date: "02.28" },
  { text: "2026년 예산 국회확정에 따른 정보 공개 안내", date: "02.20" },
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
            {["국민관심 재정정보", "나라살림 놀이터", "재정교실 이야기"].map((title) => (
              <div key={title} className="flex items-center justify-between">
                <h3 className="gov-section-title flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full bg-gov-blue" />
                  {title}
                </h3>
                <button className="gov-link flex items-center gap-0.5">
                  더보기 <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {storyCards.map((card, i) => (
              <motion.div key={i} variants={itemVariants} className="gov-content-card group cursor-pointer">
                <div className="aspect-[5/2] relative overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {card.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-gov-orange/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                        <Play className="w-6 h-6 text-white ml-0.5" />
                      </div>
                    </div>
                  )}
                  {card.isNew && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-gov-orange text-white text-[10px] font-bold rounded-md shadow-md">
                      NEW
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-gov-blue transition-colors">{card.title}</h4>
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

        {/* Bottom Grid: 공지사항 + 재정지표 대시보드 + Quick Actions — equal height */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr"
        >
          {/* 공지사항 */}
          <motion.div variants={itemVariants} className="gov-card p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Bell className="w-4 h-4 text-gov-orange" />
                공지사항
              </h3>
              <button className="gov-link flex items-center gap-0.5 text-xs">
                더보기 <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <ul className="space-y-3 flex-1">
              {notices.map((n, i) => (
                <li key={i} className="flex items-center justify-between gap-3 group cursor-pointer">
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors line-clamp-1 flex-1">
                    {n.text}
                  </span>
                  <span className="text-[11px] text-muted-foreground/60 shrink-0">{n.date}</span>
                </li>
              ))}
            </ul>
            
          </motion.div>

          {/* 재정지표 대시보드 */}
          <motion.div variants={itemVariants} className="gov-card p-5 overflow-hidden relative flex flex-col">
            <h3 className="text-base font-semibold text-foreground mb-2 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-gov-blue" />
              재정지표 대시보드
            </h3>
            <p className="text-xs text-muted-foreground mb-4">주요 재정지표를 다양한 통계 그래프로 한 눈에 확인하세요.</p>
            <div className="relative rounded-xl overflow-hidden border border-border aspect-[5/2]">
              <img
                src={dashboardImg}
                alt="재정지표 대시보드 미리보기"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent flex items-end p-4">
                <button className="px-4 py-2 bg-gov-blue text-white text-xs font-medium rounded-lg shadow-lg hover:bg-gov-blue/90 transition-colors flex items-center gap-1">
                  대시보드 바로가기 <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <div className="gov-card p-5 relative overflow-hidden group flex-1">
              <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-gov-blue/5 group-hover:bg-gov-blue/10 transition-colors" />
              <div className="absolute -right-2 -top-2 w-16 h-16 rounded-full bg-gov-blue/5 group-hover:bg-gov-blue/10 transition-colors" />
              <div className="relative flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gov-blue/20 to-gov-blue/5 flex items-center justify-center shrink-0 border border-gov-blue/10">
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
            <div className="gov-card p-5 relative overflow-hidden group flex-1">
              <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-gov-green/5 group-hover:bg-gov-green/10 transition-colors" />
              <div className="absolute -right-2 -top-2 w-16 h-16 rounded-full bg-gov-green/5 group-hover:bg-gov-green/10 transition-colors" />
              <div className="relative flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gov-green/20 to-gov-green/5 flex items-center justify-center shrink-0 border border-gov-green/10">
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
