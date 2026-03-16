import { useState } from "react";
import { Move, X, ChevronLeft, ChevronRight, Share2, Clock, Trophy } from "lucide-react";

const OXQuizWidget = () => {
  const [answered, setAnswered] = useState<boolean | null>(null);

  return (
    <div className="gov-card p-5 h-full flex flex-col">
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

      <div className="flex-1 flex flex-col items-center justify-center py-4">
        <span className="text-xs font-semibold text-gov-blue mb-3 tracking-wide">OX 퀴즈</span>
        <div className="bg-muted/50 rounded-xl p-4 mb-4 w-full text-center border border-border">
          <p className="text-sm font-medium text-foreground">국가채무는 세입보다 많다?</p>
        </div>

        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setAnswered(true)}
            className={`w-14 h-14 rounded-full text-xl font-bold transition-all duration-200 ${
              answered === true
                ? "bg-gov-blue text-primary-foreground scale-110"
                : "bg-muted text-muted-foreground hover:bg-gov-blue/10 hover:text-gov-blue"
            }`}
          >
            O
          </button>
          <button
            onClick={() => setAnswered(false)}
            className={`w-14 h-14 rounded-full text-xl font-bold transition-all duration-200 ${
              answered === false
                ? "bg-gov-red text-primary-foreground scale-110"
                : "bg-muted text-muted-foreground hover:bg-gov-red/10 hover:text-gov-red"
            }`}
          >
            X
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Trophy className="w-3 h-3" /> 점수 80</span>
          <span>랭킹 3위</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 12초</span>
        </div>
      </div>

      <button className="w-full py-2 text-xs font-medium text-gov-blue bg-gov-blue-light rounded-lg hover:bg-gov-blue/10 transition-colors">
        SNS 공유
      </button>
    </div>
  );
};

export default OXQuizWidget;
