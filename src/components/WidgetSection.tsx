import { motion } from "framer-motion";
import { Plus, Move, X, Star, ChevronRight } from "lucide-react";
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
    <section className="py-8 md:py-12 px-5 md:px-8 bg-muted/30">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="gov-section-title">나만의 재정정보</h2>
          <button className="p-2 rounded-lg hover:bg-muted border border-border transition-colors bg-card">
            <Plus className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
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
