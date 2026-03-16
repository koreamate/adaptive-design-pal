import { useState } from "react";
import { Move, X, ChevronRight, Clock, Trophy, Zap, Share2 } from "lucide-react";

const OXQuizWidget = () => {
  const [answered, setAnswered] = useState<boolean | null>(null);

  return (
    <div className="gov-card p-4 h-full flex flex-col overflow-hidden">
      <div className="gov-widget-header">
        <button className="flex items-center gap-1 text-sm font-semibold text-foreground hover:text-gov-blue transition-colors">
          게이미피케이션 <ChevronRight className="w-4 h-4" />
        </button>
        <div className="flex gap-1">
          <button className="p-1.5 rounded hover:bg-muted transition-colors">
            <Move className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
          <button className="p-1.5 rounded hover:bg-muted transition-colors">
            <X className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-between pt-3 pb-1 min-h-0">
        {/* Question */}
        <div className="w-full rounded-lg p-3 bg-muted/50 border border-border">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="px-1.5 py-0.5 bg-gov-blue/10 text-gov-blue text-[9px] font-bold rounded">OX퀴즈</span>
            <span className="px-1.5 py-0.5 bg-gov-orange/10 text-gov-orange text-[9px] font-bold rounded">TODAY</span>
            <span className="text-[9px] text-muted-foreground ml-auto">12/20</span>
          </div>
          <p className="text-[13px] font-semibold text-foreground text-center">국가채무는 세입보다 많다?</p>
        </div>

        {/* O/X Buttons */}
        <div className="flex gap-4 py-2">
          <button
            onClick={() => setAnswered(true)}
            className={`w-12 h-12 rounded-xl text-lg font-black transition-all duration-300 ${
              answered === true
                ? "bg-gov-blue text-white scale-110 shadow-md"
                : "bg-card border-2 border-gov-blue/20 text-gov-blue hover:border-gov-blue/40"
            }`}
          >
            O
          </button>
          <button
            onClick={() => setAnswered(false)}
            className={`w-12 h-12 rounded-xl text-lg font-black transition-all duration-300 ${
              answered === false
                ? "bg-gov-red text-white scale-110 shadow-md"
                : "bg-card border-2 border-gov-red/20 text-gov-red hover:border-gov-red/40"
            }`}
          >
            X
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-2 w-full">
          <div className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md bg-gov-orange/5 border border-gov-orange/10">
            <Trophy className="w-3 h-3 text-gov-orange" />
            <span className="text-[10px] font-semibold text-gov-orange">80점</span>
          </div>
          <div className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md bg-gov-blue/5 border border-gov-blue/10">
            <Zap className="w-3 h-3 text-gov-blue" />
            <span className="text-[10px] font-semibold text-gov-blue">3위</span>
          </div>
          <div className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md bg-gov-green/5 border border-gov-green/10">
            <Clock className="w-3 h-3 text-gov-green" />
            <span className="text-[10px] font-semibold text-gov-green">12초</span>
          </div>
        </div>

        {/* Share */}
        <button className="w-full mt-2 py-1.5 text-[11px] font-medium text-gov-blue bg-gov-blue/5 border border-gov-blue/10 rounded-lg hover:bg-gov-blue/10 transition-colors flex items-center justify-center gap-1">
          <Share2 className="w-3 h-3" /> SNS 공유
        </button>
      </div>
    </div>
  );
};

export default OXQuizWidget;
