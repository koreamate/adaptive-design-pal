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
      {/* Large repeating finance pattern background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="finance-pattern" x="0" y="0" width="320" height="280" patternUnits="userSpaceOnUse">
            {/* Bar chart */}
            <rect x="20" y="80" width="24" height="50" rx="4" fill="hsl(var(--gov-blue))" />
            <rect x="52" y="55" width="24" height="75" rx="4" fill="hsl(var(--gov-blue))" />
            <rect x="84" y="30" width="24" height="100" rx="4" fill="hsl(var(--gov-blue))" />
            <rect x="116" y="65" width="24" height="65" rx="4" fill="hsl(var(--gov-blue))" />
            <line x1="15" y1="132" x2="145" y2="132" stroke="hsl(var(--gov-blue))" strokeWidth="2.5" />
            
            {/* Pie chart */}
            <circle cx="240" cy="60" r="40" fill="none" stroke="hsl(var(--gov-blue))" strokeWidth="12" strokeDasharray="62.8 188.5" />
            <circle cx="240" cy="60" r="40" fill="none" stroke="hsl(var(--gov-blue))" strokeWidth="12" strokeDasharray="94.2 157.1" strokeDashoffset="-62.8" opacity="0.5" />
            <circle cx="240" cy="60" r="40" fill="none" stroke="hsl(var(--gov-blue))" strokeWidth="12" strokeDasharray="50.3 200.9" strokeDashoffset="-157" opacity="0.25" />
            
            {/* Coin / currency circle */}
            <circle cx="80" cy="210" r="32" stroke="hsl(var(--gov-blue))" strokeWidth="3" fill="none" />
            <circle cx="80" cy="210" r="24" stroke="hsl(var(--gov-blue))" strokeWidth="2" fill="none" />
            <text x="80" y="218" textAnchor="middle" fill="hsl(var(--gov-blue))" fontSize="22" fontWeight="700" fontFamily="serif">₩</text>
            
            {/* Trend line */}
            <polyline points="180,240 210,220 230,230 260,190 290,200 310,170" fill="none" stroke="hsl(var(--gov-blue))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="260" cy="190" r="4" fill="hsl(var(--gov-blue))" />
            <circle cx="310" cy="170" r="4" fill="hsl(var(--gov-blue))" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#finance-pattern)" />
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
