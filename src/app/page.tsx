import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Certifications from "@/components/Certifications";
import Products from "@/components/Products";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Certifications />
      <Products />
      <Process />
      <Testimonials />
      <Pricing />
      <Footer />
      <ChatBot />
      <StickyMobileCTA />
    </main>
  );
}
