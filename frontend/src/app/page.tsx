import { AnimatedBackground } from "@/components/animated-background";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Navbar } from "@/components/navbar";
import { Testimonials } from "@/components/testimonials";
import { TrustSection } from "@/components/trust-section";
import { UseCases } from "@/components/use-cases";
import { Waitlist } from "@/components/waitlist";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <UseCases />
          <HowItWorks />
          <TrustSection />
          <Testimonials />
          <Waitlist />
        </main>
        <Footer />
      </div>
    </>
  );
}
