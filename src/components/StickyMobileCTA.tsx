"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      // Fallback: show after 400px scroll
      const handler = () => setVisible(window.scrollY > 400);
      window.addEventListener("scroll", handler, { passive: true });
      return () => window.removeEventListener("scroll", handler);
    }

    const obs = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 inset-x-0 z-40 md:hidden glass border-t border-border/50"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="flex gap-2 px-4 py-3">
            <a
              href={`tel:${t("quote.phone").replace(/\D/g, "")}`}
              className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl border border-border/60 text-sm font-semibold text-foreground hover:bg-muted/30 transition-colors"
            >
              <Phone className="w-4 h-4 text-primary" />
              {t("nav.callNow")}
            </a>
            <a
              href="#contact"
              className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-primary text-primary-foreground text-sm font-semibold glow transition-opacity hover:opacity-90"
            >
              {t("nav.getQuote")}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
