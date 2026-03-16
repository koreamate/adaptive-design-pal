import { useState } from "react";
import { Move, X, ChevronRight, Clock, Trophy, Zap, Share2, CircleCheck, CircleX } from "lucide-react";

const OXQuizWidget = () => {
  const [answered, setAnswered] = useState<boolean | null>(null);

  return (
    <div className="gov-card p-4 h-full flex flex-col overflow-hidden">
      <div className="gov-widget-header">
        <button className="flex items-center gap-1 text-sm font-semibold text-foreground hover:text-primary transition-colors">
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
        {/* Header Badge */}
        <div className="w-full flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full border border-primary/20">OX퀴즈</span>
            <span className="px-2 py-0.5 bg-primary/5 text-primary/70 text-[10px] font-bold rounded-full border border-primary/10">TODAY</span>
          </div>
          <span className="text-[10px] font-semibold text-primary/50 bg-primary/5 px-2 py-0.5 rounded-full">12 / 20</span>
        </div>

        {/* Question Card */}
        <div className="w-full rounded-lg p-2.5 bg-primary/5 border border-primary/15 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-14 h-14 bg-primary/5 rounded-bl-[28px]" />
          <p className="text-xs font-bold text-foreground text-center leading-snug relative z-10">
            국가채무는 세입보다 많다?
          </p>
        </div>

        {/* O/X Buttons - horizontal layout */}
        <div className="flex gap-3 py-2 w-full justify-center">
          <button
            onClick={() => setAnswered(true)}
            className={`flex-1 max-w-[80px] h-10 rounded-xl text-sm font-black transition-all duration-300 flex items-center justify-center ${
              answered === true
                ? "bg-primary text-primary-foreground scale-105 shadow-md shadow-primary/30"
                : "bg-primary/5 border-2 border-primary/20 text-primary hover:border-primary/40 hover:bg-primary/10"
            }`}
          >
            O
          </button>
          <button
            onClick={() => setAnswered(false)}
            className={`flex-1 max-w-[80px] h-10 rounded-xl text-sm font-black transition-all duration-300 flex items-center justify-center ${
              answered === false
                ? "bg-[hsl(210,70%,40%)] text-white scale-105 shadow-md shadow-[hsl(210,70%,40%)/0.3]"
                : "bg-[hsl(210,50%,92%)] border-2 border-[hsl(210,50%,70%)]/30 text-[hsl(210,70%,40%)] hover:border-[hsl(210,50%,70%)]/50 hover:bg-[hsl(210,50%,88%)]"
            }`}
          >
            X
          </button>
        </div>

        {/* Answer Feedback */}
        {answered !== null && (
          <div className="w-full rounded-lg p-2 bg-primary/5 border border-primary/15 flex items-center gap-2 mb-2">
            {answered ? (
              <CircleCheck className="w-4 h-4 text-primary shrink-0" />
            ) : (
              <CircleX className="w-4 h-4 text-[hsl(210,70%,40%)] shrink-0" />
            )}
            <span className="text-[11px] font-semibold text-foreground/70">
              {answered ? "정답입니다! 🎉" : "아쉽네요, 다시 도전하세요!"}
            </span>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-2 w-full">
          <div className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-primary/5 border border-primary/15">
            <Trophy className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-bold text-primary">80점</span>
          </div>
          <div className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[hsl(210,60%,94%)] border border-[hsl(210,50%,80%)]/40">
            <Zap className="w-3.5 h-3.5 text-[hsl(210,70%,45%)]" />
            <span className="text-[11px] font-bold text-[hsl(210,70%,45%)]">3위</span>
          </div>
          <div className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[hsl(200,60%,94%)] border border-[hsl(200,50%,80%)]/40">
            <Clock className="w-3.5 h-3.5 text-[hsl(200,70%,40%)]" />
            <span className="text-[11px] font-bold text-[hsl(200,70%,40%)]">12초</span>
          </div>
        </div>

        {/* Share Button */}
        <button className="w-full mt-2 py-2 text-[11px] font-bold text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-1.5 shadow-sm">
          <Share2 className="w-3.5 h-3.5" /> SNS 공유하기
        </button>
      </div>
    </div>
  );
};

export default OXQuizWidget;
