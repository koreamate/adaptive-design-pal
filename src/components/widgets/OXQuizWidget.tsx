import { useState } from "react";
import { Move, X, ChevronRight, Clock, Trophy, Zap, Share2 } from "lucide-react";

const OXQuizWidget = () => {
  const [answered, setAnswered] = useState<boolean | null>(null);

  return (
    <div className="gov-card h-full flex flex-col overflow-hidden relative">
      {/* Decorative top banner */}
      <div className="bg-gradient-to-r from-gov-blue via-gov-blue/90 to-gov-navy px-4 py-3 relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-white/10" />
        <div className="absolute right-8 -bottom-4 w-12 h-12 rounded-full bg-white/5" />
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <span className="text-xs font-bold text-white tracking-wide">OX 퀴즈</span>
              <p className="text-[10px] text-white/60">Q. 12 / 20</p>
            </div>
          </div>
          <div className="flex gap-1">
            <button className="p-1 rounded hover:bg-white/10 transition-colors">
              <Move className="w-3.5 h-3.5 text-white/70" />
            </button>
            <button className="p-1 rounded hover:bg-white/10 transition-colors">
              <X className="w-3.5 h-3.5 text-white/70" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-3 gap-3">
        {/* Question card */}
        <div className="w-full rounded-xl p-3.5 bg-gradient-to-br from-muted/60 to-muted/30 border border-border relative">
          <span className="absolute -top-2 left-3 px-2 py-0.5 bg-gov-orange text-white text-[9px] font-bold rounded-md">
            TODAY
          </span>
          <p className="text-sm font-semibold text-foreground text-center mt-1">국가채무는 세입보다 많다?</p>
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

      {/* Bottom action */}
      <div className="px-4 pb-3">
        <button className="w-full py-2 text-xs font-semibold text-white bg-gradient-to-r from-gov-blue to-gov-blue/80 rounded-xl hover:shadow-md hover:shadow-gov-blue/20 transition-all flex items-center justify-center gap-1.5">
          <Share2 className="w-3 h-3" />
          SNS 공유하기
        </button>
      </div>
    </div>
  );
};

export default OXQuizWidget;
