import GNBHeader from "@/components/GNBHeader";
import HeroSection from "@/components/HeroSection";
import WidgetSection from "@/components/WidgetSection";
import KoreaMap from "@/components/KoreaMap";
import ContentSection from "@/components/ContentSection";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <GNBHeader />
      <main>
        <HeroSection />
        <WidgetSection />
        <KoreaMap />
        <ContentSection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
