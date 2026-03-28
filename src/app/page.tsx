import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Certifications from "@/components/Certifications";
import TrustBanner from "@/components/TrustBanner";
import Features from "@/components/Features";
import Products from "@/components/Products";
import Process from "@/components/Process";
import ProjectGallery from "@/components/ProjectGallery";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import SavingsCalculator from "@/components/SavingsCalculator";
import PromoBanners from "@/components/PromoBanners";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Certifications />
      <TrustBanner />
      <Features />
      <Products />
      <Process />
      <ProjectGallery />
      <Testimonials />
      <FAQ />
      <SavingsCalculator />
      <PromoBanners />
      <Pricing />
      <Footer />
      <ChatBot />
      <StickyMobileCTA />
    </main>
  );
}
