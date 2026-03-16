const Mockup = () => {
  const previewUrl = window.location.origin + "/";

  return (
    <div
      className="bg-[hsl(210,20%,96%)] flex flex-col items-center justify-center p-8 gap-8"
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
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[hsl(210,20%,94%)] border-b border-border">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-card rounded-md px-3 py-1 text-[10px] text-muted-foreground border border-border text-center">
                https://openfinance.go.kr
              </div>
            </div>
          </div>
          <iframe
            src={previewUrl}
            title="Desktop Preview"
            className="w-full border-0 pointer-events-none"
            style={{ height: "420px", transform: "scale(0.47)", transformOrigin: "top left", width: "1440px" }}
          />
        </div>
      </div>

      {/* Mobile Mockup */}
      <div className="flex flex-col items-center">
        <p className="text-xs font-semibold text-muted-foreground mb-2">📱 Mobile (390px)</p>
        <div className="rounded-[2rem] border-[3px] border-[hsl(220,10%,25%)] bg-[hsl(220,10%,15%)] p-2 shadow-xl">
          {/* Notch */}
          <div className="flex justify-center mb-1">
            <div className="w-20 h-4 bg-[hsl(220,10%,15%)] rounded-b-xl" />
          </div>
          <div className="rounded-[1.5rem] overflow-hidden bg-card">
            <iframe
              src={previewUrl}
              title="Mobile Preview"
              className="border-0 pointer-events-none"
              style={{ height: "780px", width: "390px", transform: "scale(0.5)", transformOrigin: "top left" }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="text-[10px] text-muted-foreground">© 2026 열린재정 · 디지털예산회계기획단</p>
    </div>
  );
};

export default Mockup;
