import logoImg from "@/assets/logo.png";
import logoMoef from "@/assets/logo-moef.png";
import logoKpfis from "@/assets/logo-kpfis.png";
import logoNap from "@/assets/logo-nap.png";
import logoNontax from "@/assets/logo-nontax.png";
import logoElearn from "@/assets/logo-elearn.png";
import logoSubsidy from "@/assets/logo-subsidy.png";
import footerBadges from "@/assets/footer-badges.png";

const footerLinks = [
  "이용약관",
  "개인정보처리방침",
  "저작권 및 공공데이터 이용정책",
  "이메일무단수집거부",
  "공공데이터 개방",
];

const relatedSites = [
  { name: "기획재정부", logo: logoMoef },
  { name: "한국재정정보원", logo: logoKpfis },
  { name: "국유재산포털", logo: logoNap },
  { name: "국세외수입포털", logo: logoNontax },
  { name: "e재정배움", logo: logoElearn },
  { name: "보조금통합포털", logo: logoSubsidy },
];

const SiteFooter = () => {
  return (
    <footer className="border-t border-border bg-card">
      {/* Related Sites Banner */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-3">
          <div className="flex items-center justify-between flex-wrap gap-y-4">
            {relatedSites.map((site) => (
              <a
                key={site.name}
                href="#"
                className="opacity-70 hover:opacity-100 transition-opacity"
                title={site.name}
              >
                <img src={site.logo} alt={site.name} className={`${site.name === "국세외수입포털" ? "h-[64px] md:h-[72px]" : "h-12 md:h-14"} w-auto object-contain`} />
              </a>
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
              <img src={logoImg} alt="열린재정" className="h-14 w-auto" />
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
          <div className="flex items-center">
            <img src={footerBadges} alt="한국재정정보원 FiS · WA 인증마크" className="h-12 w-auto object-contain" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
