"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, ThumbsUp, Medal } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";

export default function TrustBanner() {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: ShieldCheck,
      title: t("trust.b1.title"),
      desc: t("trust.b1.desc"),
    },
    {
      icon: Medal,
      title: t("trust.b2.title"),
      desc: t("trust.b2.desc"),
    },
    {
      icon: Award,
      title: t("trust.b3.title"),
      desc: t("trust.b3.desc"),
    },
    {
      icon: ThumbsUp,
      title: t("trust.b4.title"),
      desc: t("trust.b4.desc"),
    },
  ];

  return (
    <section className="py-16 bg-primary/5 border-y border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            {t("trust.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("trust.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/50 shadow-sm"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}