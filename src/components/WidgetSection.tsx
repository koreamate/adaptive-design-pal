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
