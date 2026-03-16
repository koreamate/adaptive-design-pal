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

      <div className="flex-1 flex flex-col items-center justify-center py-3 gap-3">
        {/* Question card */}
        <div className="w-full rounded-xl p-3.5 bg-muted/50 border border-border relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-gov-blue/10 text-gov-blue text-[10px] font-bold rounded-md">OX 퀴즈</span>
            <span className="px-2 py-0.5 bg-gov-orange/10 text-gov-orange text-[10px] font-bold rounded-md">TODAY</span>
            <span className="text-[10px] text-muted-foreground ml-auto">Q.12 / 20</span>
          </div>
          <p className="text-sm font-semibold text-foreground text-center">국가채무는 세입보다 많다?</p>
        </div>

        {/* O/X Buttons */}
        <div className="flex gap-5">
          <button
            onClick={() => setAnswered(true)}
            className={`w-14 h-14 rounded-2xl text-xl font-black transition-all duration-300 shadow-sm ${
              answered === true
                ? "bg-gradient-to-br from-gov-blue to-gov-blue/80 text-white scale-110 shadow-lg shadow-gov-blue/30"
                : "bg-card border-2 border-gov-blue/20 text-gov-blue hover:border-gov-blue/50 hover:shadow-md"
            }`}
          >
            O
          </button>
          <button
            onClick={() => setAnswered(false)}
            className={`w-14 h-14 rounded-2xl text-xl font-black transition-all duration-300 shadow-sm ${
              answered === false
                ? "bg-gradient-to-br from-gov-red to-gov-red/80 text-white scale-110 shadow-lg shadow-gov-red/30"
                : "bg-card border-2 border-gov-red/20 text-gov-red hover:border-gov-red/50 hover:shadow-md"
            }`}
          >
            X
          </button>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gov-orange/5 border border-gov-orange/10">
            <Trophy className="w-3 h-3 text-gov-orange" />
            <span className="text-[11px] font-semibold text-gov-orange">80점</span>
          </div>
          <div className="flex-1 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gov-blue/5 border border-gov-blue/10">
            <Zap className="w-3 h-3 text-gov-blue" />
            <span className="text-[11px] font-semibold text-gov-blue">3위</span>
          </div>
          <div className="flex-1 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gov-green/5 border border-gov-green/10">
            <Clock className="w-3 h-3 text-gov-green" />
            <span className="text-[11px] font-semibold text-gov-green">12초</span>
          </div>
        </div>
      </div>

      <button className="w-full py-2 text-xs font-medium text-gov-blue bg-gov-blue/5 border border-gov-blue/10 rounded-lg hover:bg-gov-blue/10 transition-colors flex items-center justify-center gap-1.5">
        <Share2 className="w-3 h-3" />
        SNS 공유
      </button>
    </div>
  );
};

export default OXQuizWidget;
