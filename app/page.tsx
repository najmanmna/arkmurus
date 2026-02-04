import CinematicBackground from "@/components/CinematicBackground"; // IMPORT NEW COMPONENT
import HeroSection from "@/components/HeroSection";
import WhoWeAre from "@/components/WhoWeAre";
import ServiceLayout from "@/components/ServiceLayout";
import Leadership from "@/components/Leadership";
import GeographicReach from "@/components/GeographicReach";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen text-white">
      {/* THE CINEMATIC ENGINE */}
      <CinematicBackground />

      {/* THE CONTENT - Spaced out for the journey */}
      <div className="relative z-10 flex flex-col w-full">
        {/* HERO: The Void */}
        <HeroSection />

        {/* GLASS PANEL WRAPPER */}

        <div className="relative w-full bg-transparent backdrop-blur-[1px]">
      
          <div className="pt-24 pb-24">
            <WhoWeAre />
            <ServiceLayout
              id="governments"
              title="For Governments"
              description="We advise sovereign entities and defence ministries..."
              capabilities={[
                "Defence Procurement",
                "Capability Gap Analysis",
                "Industrial Partnership",
                "G2G Facilitation",
              ]}
              isReversed={false}
            />
          </div>

        
          <div className="pt-24 pb-24">
            <ServiceLayout
              id="industry"
              title="For Industry"
              description="We connect defence and technology companies..."
              capabilities={[
                "Market Entry",
                "Government Relations",
                "Stakeholder Engagement",
                "Due Diligence",
              ]}
              isReversed={true}
            />
            <GeographicReach />
          </div>

   
          <div className="pt-24">
            <Leadership />
            <ContactFooter />
          </div>
        </div>
      </div>
    </main>
  );
}
