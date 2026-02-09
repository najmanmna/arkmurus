'use client';

import dynamic from 'next/dynamic';
import HeroSection from "@/components/HeroSection";
import WhoWeAre from "@/components/WhoWeAre";
import ServiceLayout from "@/components/ServiceLayout";
import Leadership from "@/components/Leadership";
import GeographicReach from "@/components/GeographicReach";
import ContactFooter from "@/components/ContactFooter";
import Loader from "@/components/Loader";

// 1. Lazy Load
const CinematicBackground = dynamic(() => import('@/components/CinematicBackground'), { 
  ssr: false,
});

export default function Home() {
  return (
    // REMOVED: bg-[#050505] from here. Let the CinematicBackground handle the color.
    <div className="relative w-full min-h-screen text-white selection:bg-[#cc9966] selection:text-black">
      
      {/* LAYER 3: LOADER (Top) */}
      <Loader /> 
      
      {/* LAYER 1: BACKGROUND (Bottom) */}
      {/* REMOVED: The wrapping <div>. The component already has 'fixed inset-0' inside it. */}
      <CinematicBackground />

      {/* LAYER 2: CONTENT (Middle) */}
      {/* Added pointer-events-none to the wrapper, but auto to children so clicks work */}
      <main className="relative z-10 flex flex-col w-full">
        <HeroSection />

        <div className="relative w-full bg-transparent">
          <div className="pt-24 pb-24">
            <WhoWeAre />
            <ServiceLayout
              id="governments"
              title="For Governments"
              description="We advise sovereign entities and defence ministries on strategic procurement, capability development, and international partnership formation. Our team maintains trusted relationships across the global defence industrial base, enabling us to identify optimal solutions, facilitate introductions, and guide negotiations to successful conclusion. We understand the unique requirements of government stakeholders - discretion, reliability, and deep domain expertise are the foundations of every engagement."
              capabilities={[
                "Defence Procurement", "Capability Gap Analysis", "Industrial Partnership", "G2G Facilitation"
              ]}
              isReversed={false}
              index={1}
            />
          </div>

          <div className="pt-24 pb-24">
            <ServiceLayout
              id="industry"
              title="For Industry"
              description="We connect defence and technology companies with decision-makers in government and across international markets. For established primes and emerging innovators alike, we provide strategic guidance on market entry, stakeholder mapping, and opportunity identification in complex jurisdictions. Our network spans defence ministries, procurement agencies, and sovereign wealth entities across Europe, the Middle East, Africa, and beyond."
              capabilities={[
                "Market Entry", "Government Relations", "Stakeholder Engagement", "Due Diligence"
              ]}
              isReversed={true}
              index={2}
            />
            <GeographicReach />
          </div>

          <div className="pt-24">
            <Leadership />
            <ContactFooter />
          </div>
        </div>
      </main>
    </div>
  );
}