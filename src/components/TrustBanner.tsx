"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, ThumbsUp, Medal } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";

export default function TrustBanner() {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: ShieldCheck,
      title: "25-Year Warranty",
      desc: "End-to-end coverage on panels, inverters, and workmanship.",
    },
    {
      icon: Medal,
      title: "Elite Certified",
      desc: "Platinum installer for top brands like Enphase and Tesla.",
    },
    {
      icon: Award,
      title: "Top Rated Installer",
      desc: "Recognized locally for excellence in residential solar EPC.",
    },
    {
      icon: ThumbsUp,
      title: "100% Satisfaction",
      desc: "Thousands of 5-star reviews from happy homeowners.",
    },
  ];

  return (
    <section className="py-16 bg-primary/5 border-y border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Industry Leading Warranties & Trusted Expertise
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We stand by our installations 100%. Invest in lasting value and reliable power with elite technology and unmatched guarantees.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
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