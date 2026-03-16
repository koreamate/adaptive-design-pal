import desktopImg from "@/assets/mockup-desktop.png";
import mobileImg from "@/assets/mockup-mobile.png";

const Mockup = () => {
  return (
    <div
      className="bg-[hsl(210,20%,96%)] flex flex-col items-center p-8 gap-8"
      style={{ width: "720px", minHeight: "1040px", margin: "0 auto" }}
    >
      {/* Title */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">열린재정 포털</h1>
        <p className="text-sm text-muted-foreground mt-1">PC & Mobile Mockup</p>
      </div>

      {/* PC Mockup */}
      <div className="w-full">
        <p className="text-xs font-semibold text-muted-foreground mb-2 ml-1">💻 Desktop (1440px)</p>
        <div className="rounded-xl border-2 border-border bg-card shadow-lg overflow-hidden">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-muted border-b border-border">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-destructive/60" />
              <span className="w-3 h-3 rounded-full bg-gov-orange/60" />
              <span className="w-3 h-3 rounded-full bg-gov-green/60" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-card rounded-md px-3 py-1 text-[10px] text-muted-foreground border border-border text-center">
                https://openfinance.go.kr
              </div>
            </div>
          </div>
          <img src={desktopImg} alt="데스크톱 화면" className="w-full h-auto" />
        </div>
      </div>

      {/* Mobile Mockup */}
      <div className="flex flex-col items-center">
        <p className="text-xs font-semibold text-muted-foreground mb-2">📱 Mobile (390px)</p>
        <div className="rounded-[2rem] border-4 border-foreground/80 bg-foreground/90 p-2 shadow-xl" style={{ width: "220px" }}>
          {/* Notch */}
          <div className="flex justify-center mb-1">
            <div className="w-16 h-4 bg-foreground/90 rounded-b-xl" />
          </div>
          <div className="rounded-[1.4rem] overflow-hidden bg-card">
            <img src={mobileImg} alt="모바일 화면" className="w-full h-auto" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="text-[10px] text-muted-foreground">© 2026 열린재정 · 디지털예산회계기획단</p>
    </div>
  );
};

export default Mockup;
