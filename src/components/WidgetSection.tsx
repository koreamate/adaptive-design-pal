import { motion } from "framer-motion";
import { Plus, Settings } from "lucide-react";
import OXQuizWidget from "./widgets/OXQuizWidget";
import InterestStatsWidget from "./widgets/InterestStatsWidget";
import RecentViewWidget from "./widgets/RecentViewWidget";
import BookmarkWidget from "./widgets/BookmarkWidget";
import NewsfeedWidget from "./widgets/NewsfeedWidget";
import PlaygroundWidget from "./widgets/PlaygroundWidget";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] as const } },
};

const WidgetSection = () => {
  return (
    <section className="py-8 md:py-12 px-5 md:px-8 relative overflow-hidden bg-gradient-to-br from-primary/[0.04] via-primary/[0.02] to-transparent border-y border-primary/10">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(hsl(var(--gov-blue)) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      
      {/* Decorative finance illustrations - very subtle */}
      {/* Bar chart - top right */}
      <svg className="absolute top-6 right-12 opacity-[0.05]" width="120" height="100" viewBox="0 0 120 100" fill="none">
        <rect x="10" y="60" width="16" height="35" rx="3" fill="hsl(var(--gov-blue))" />
        <rect x="34" y="40" width="16" height="55" rx="3" fill="hsl(var(--gov-blue))" />
        <rect x="58" y="20" width="16" height="75" rx="3" fill="hsl(var(--gov-blue))" />
        <rect x="82" y="50" width="16" height="45" rx="3" fill="hsl(var(--gov-blue))" />
        <line x1="5" y1="95" x2="105" y2="95" stroke="hsl(var(--gov-blue))" strokeWidth="2" />
      </svg>
      
      {/* Coin stack - bottom left */}
      <svg className="absolute bottom-8 left-10 opacity-[0.04]" width="80" height="90" viewBox="0 0 80 90" fill="none">
        <ellipse cx="40" cy="75" rx="30" ry="8" fill="hsl(var(--gov-blue))" />
        <ellipse cx="40" cy="65" rx="30" ry="8" fill="hsl(var(--gov-blue))" />
        <ellipse cx="40" cy="55" rx="30" ry="8" fill="hsl(var(--gov-blue))" />
        <ellipse cx="40" cy="45" rx="30" ry="8" fill="hsl(var(--gov-blue))" />
        <rect x="10" y="45" width="60" height="30" fill="hsl(var(--gov-blue))" />
      </svg>

      {/* Pie chart - bottom right area */}
      <svg className="absolute bottom-10 right-[30%] opacity-[0.03]" width="90" height="90" viewBox="0 0 90 90" fill="none">
        <path d="M45 5 A40 40 0 0 1 85 45 L45 45 Z" fill="hsl(var(--gov-blue))" />
        <path d="M85 45 A40 40 0 0 1 45 85 L45 45 Z" fill="hsl(var(--gov-blue))" opacity="0.6" />
        <path d="M45 85 A40 40 0 0 1 5 45 L45 45 Z" fill="hsl(var(--gov-blue))" opacity="0.3" />
        <path d="M5 45 A40 40 0 0 1 45 5 L45 45 Z" fill="hsl(var(--gov-blue))" opacity="0.15" />
      </svg>

      {/* Calculator - top left area */}
      <svg className="absolute top-10 left-[18%] opacity-[0.04]" width="60" height="80" viewBox="0 0 60 80" fill="none">
        <rect x="5" y="5" width="50" height="70" rx="6" stroke="hsl(var(--gov-blue))" strokeWidth="2.5" fill="none" />
        <rect x="12" y="12" width="36" height="14" rx="2" fill="hsl(var(--gov-blue))" />
        <circle cx="18" cy="38" r="3" fill="hsl(var(--gov-blue))" />
        <circle cx="30" cy="38" r="3" fill="hsl(var(--gov-blue))" />
        <circle cx="42" cy="38" r="3" fill="hsl(var(--gov-blue))" />
        <circle cx="18" cy="50" r="3" fill="hsl(var(--gov-blue))" />
        <circle cx="30" cy="50" r="3" fill="hsl(var(--gov-blue))" />
        <circle cx="42" cy="50" r="3" fill="hsl(var(--gov-blue))" />
      </svg>
      
      <div className="max-w-[1400px] mx-auto relative">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="gov-section-title flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-gov-blue" />
              나만의 재정정보
            </h2>
            <p className="text-xs text-muted-foreground mt-1 ml-3">관심있는 위젯을 자유롭게 구성하세요</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg hover:bg-muted border border-border transition-colors bg-card">
              <Settings className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gov-blue/10 border border-gov-blue/30 transition-colors bg-gov-blue/5">
              <Plus className="w-5 h-5 text-gov-blue" />
            </button>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          style={{ gridAutoRows: "minmax(0, 290px)" }}
        >
          <motion.div variants={itemVariants}>
            <InterestStatsWidget />
          </motion.div>
          <motion.div variants={itemVariants}>
            <OXQuizWidget />
          </motion.div>
          <motion.div variants={itemVariants}>
            <RecentViewWidget />
          </motion.div>
          <motion.div variants={itemVariants}>
            <BookmarkWidget />
          </motion.div>
          <motion.div variants={itemVariants}>
            <PlaygroundWidget />
          </motion.div>
          <motion.div variants={itemVariants}>
            <NewsfeedWidget />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WidgetSection;
