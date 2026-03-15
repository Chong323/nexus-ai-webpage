"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "@/i18n/useTranslation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Ruler,
  FileText,
  HardHat,
  CheckSquare,
  Monitor,
  ArrowRight,
} from "lucide-react";

const stepIcons = [MessageSquare, Ruler, FileText, HardHat, CheckSquare, Monitor];

export default function Process() {
  const { t } = useTranslation();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 85%", "end 40%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const steps = [1, 2, 3, 4, 5, 6].map((n) => ({
    number: n,
    icon: stepIcons[n - 1],
    title: t(`process.step${n}.title`),
    description: t(`process.step${n}.description`),
  }));

  return (
    <section id="process" className="py-24 sm:py-32 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-primary uppercase tracking-widest mb-3"
          >
            {t("process.subtitle")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight"
          >
            {t("process.title")}
          </motion.h2>
        </div>

        {/* ── Mobile: vertical timeline ── */}
        <div ref={timelineRef} className="lg:hidden relative">
          {/* Scroll-driven vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border/30" />
          <motion.div
            className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-primary/70 via-primary/40 to-primary/10 origin-top"
            style={{ scaleY: lineScaleY, height: "100%" }}
          />

          <div className="space-y-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="relative flex gap-5 pl-16"
                >
                  {/* Circle on timeline */}
                  <div className="absolute left-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-[0_0_16px_oklch(0.75_0.17_75/0.4)]">
                    {step.number}
                  </div>
                  {/* Card */}
                  <div className="bg-card/60 border border-border/40 rounded-2xl p-5 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                      <h3 className="font-semibold text-sm text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Desktop: 3-column grid with connectors ── */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Connector line to next card (not last in row) */}
                {idx < 5 && idx % 3 !== 2 && (
                  <div className="absolute top-7 left-[calc(100%-0.75rem)] w-[calc(100%-3rem)] z-0 pointer-events-none overflow-hidden">
                    <div className="h-0.5 bg-border/20" />
                    <motion.div
                      className="h-0.5 bg-gradient-to-r from-primary/50 to-primary/15 -mt-0.5 origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
                    />
                  </div>
                )}

                <div className="relative z-10 bg-card/60 border border-border/40 rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_12px_32px_oklch(0.75_0.17_75/0.12)] card-inner-glow group">
                  {/* Step number + icon */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="relative w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-base flex-shrink-0 shadow-[0_0_20px_oklch(0.75_0.17_75/0.35)] group-hover:shadow-[0_0_32px_oklch(0.75_0.17_75/0.55)] transition-shadow duration-300">
                      {step.number}
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                  </div>

                  <h3 className="font-semibold text-base mb-2 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* End CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-14"
        >
          <p className="text-muted-foreground mb-4">{t("process.ctaText")}</p>
          <a
            href="#contact"
            className={cn(buttonVariants({ size: "lg" }), "gap-2 bg-primary text-primary-foreground glow px-8")}
          >
            {t("hero.cta1")}
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
