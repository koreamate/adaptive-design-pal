import GNBHeader from "@/components/GNBHeader";
import HeroSection from "@/components/HeroSection";
import WidgetSection from "@/components/WidgetSection";
import ContentSection from "@/components/ContentSection";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <GNBHeader />
      <main>
        <HeroSection />
        <WidgetSection />
        <ContentSection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
