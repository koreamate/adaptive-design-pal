import logoImg from "@/assets/logo.png";

const footerLinks = [
  "이용약관",
  "개인정보처리방침",
  "저작권 및 공공데이터 이용정책",
  "이메일무단수집거부",
  "공공데이터 개방",
];

const relatedSites = [
  "기획예산처",
  "한국재정정보원",
  "국유재산포털",
  "국세외수입포털",
  "e재정배움",
  "보조금통합포털",
];

const SiteFooter = () => {
  return (
    <footer className="border-t border-border bg-card">
      {/* Related Sites */}
      <div className="border-b border-border">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-4">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
            {relatedSites.map((site) => (
              <button
                key={site}
                className="text-xs text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors"
              >
                {site}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-gov-navy flex items-center justify-center">
                <span className="text-primary-foreground text-[10px] font-bold">FiS</span>
              </div>
              <span className="text-sm font-semibold text-foreground">한국재정정보원</span>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4">
              {footerLinks.map((link, i) => (
                <span key={link}>
                  <button className={`text-xs transition-colors ${
                    link === "개인정보처리방침"
                      ? "font-semibold text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}>
                    {link}
                  </button>
                  {i < footerLinks.length - 1 && (
                    <span className="text-border ml-3">|</span>
                  )}
                </span>
              ))}
            </div>

            <div className="space-y-1 text-xs text-muted-foreground">
              <p>(30112) 세종특별자치시 도움6로 42 정부세종청사 중앙동 기획예산처</p>
              <p>고객센터 번호 : 1811-8822</p>
              <p className="mt-3">Copyright 2022 기획예산처 All Rights Reserved.</p>
            </div>
          </div>

          {/* Certification Badges */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-10 rounded bg-muted/50 border border-border flex items-center justify-center">
              <span className="text-[9px] text-muted-foreground font-medium">FiS</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-muted/50 border border-border flex items-center justify-center">
              <span className="text-[8px] text-muted-foreground">WA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
