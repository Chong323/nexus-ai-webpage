"use client";

import { motion } from "framer-motion";
import { Gift, ArrowRight } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";

export default function PromoBanners() {
  const { t } = useTranslation();

  return (
    <section className="py-16 sm:py-24 bg-card border-y border-border/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Referral Program */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-card border border-border/60 shadow-sm p-8 sm:p-12 flex flex-col items-center text-center group hover:border-green-500/30 hover:shadow-md transition-all"
        >
          <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Gift className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
            {t("promo.referralTitle")}
          </h3>
          <p className="text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            {t("promo.referralDesc")}
          </p>
          <div>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-2 border-primary text-primary hover:bg-primary/5 h-11 px-8"
            >
              {t("promo.referralBtn")}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}