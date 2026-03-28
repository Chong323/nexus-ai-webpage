"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Menu, X, Sun, Globe, Phone } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#services", key: "nav.services" },
  { href: "#about", key: "nav.about" },
  { href: "#process", key: "nav.projects" },
  { href: "#testimonials", key: "nav.testimonials" },
  { href: "#contact", key: "nav.contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const { t } = useTranslation();
  const { locale, setLocale } = useLanguage();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.35, rootMargin: "-64px 0px 0px 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const toggleLocale = () => setLocale(locale === "en" ? "zh" : "en");

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0 ml-4 lg:ml-8">
          <div className="flex items-center justify-center transition-transform hover:scale-105">
          <img src="/images/logoR.png" alt="Nason Solar Logo" className="h-10 w-auto object-contain scale-[1.8] origin-left" />
        </div>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t(link.key)}
                </a>
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Desktop right area */}
        <div className="hidden md:flex items-center gap-3">
          {/* Phone number */}
          <a
            href={`tel:${t("quote.phone").replace(/\D/g, "")}`}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted/30"
          >
            <Phone className="w-3.5 h-3.5" />
            {t("quote.phone")}
          </a>
          {/* Language toggle */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted/30"
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4" />
            {locale === "en" ? "中文" : "EN"}
          </button>
          <a
            href="#contact"
            className={cn(
              buttonVariants({ size: "sm" }),
              "glow bg-primary text-primary-foreground"
            )}
          >
            {t("nav.getQuote")}
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleLocale}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground"
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4" />
          </button>
          <button
            className="p-2 rounded-md"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="md:hidden glass border-t border-border"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(link.key)}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                <a
                  href={`tel:${t("quote.phone").replace(/\D/g, "")}`}
                  className="flex items-center justify-center gap-2 h-9 rounded-md border border-border/60 text-sm font-medium text-foreground hover:bg-muted/30 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <Phone className="w-4 h-4" />
                  {t("nav.callNow")}
                </a>
                <a
                  href="#contact"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "bg-primary text-primary-foreground text-center"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {t("nav.getQuote")}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
