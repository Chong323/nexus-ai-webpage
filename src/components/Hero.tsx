"use client";

import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, ChevronDown } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import { cn } from "@/lib/utils";

function CountUp({
  to,
  suffix = "",
  delay = 1.5,
}: {
  to: number;
  suffix?: string;
  delay?: number;
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    const controls = animate(0, to, {
      duration: 1.8,
      delay,
      ease: "easeOut",
      onUpdate(v) {
        setVal(Math.round(v));
      },
    });
    return controls.stop;
  }, [to, delay]);

  return (
    <>
      {val}
      {suffix}
    </>
  );
}

export default function Hero() {
  const { t } = useTranslation();

  const stats = [
    { to: 500, suffix: "+", label: t("hero.stat1Label") },
    { to: 25, suffix: "MW+", label: t("hero.stat2Label") },
    { to: 98, suffix: "%", label: t("hero.stat3Label") },
    { to: 25, suffix: "yr", label: t("hero.stat4Label") },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 -z-10 noise-overlay">
        {/* Gradient placeholder — visible until video loads */}
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.08_0.04_260)] via-[oklch(0.12_0.03_255)] to-[oklch(0.10_0.03_248)]" />
        {/* Sunrise amber glow from top */}
        <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-[oklch(0.75_0.17_75/0.15)] via-transparent to-transparent" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(0.75 0.17 75) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.75 0.17 75) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-[2000ms]"
          onLoadedData={(e) => {
            (e.currentTarget as HTMLVideoElement).style.opacity = "0.55";
          }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Readability overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/35 to-background/75" />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex items-center justify-center pt-16 pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Badge
              variant="secondary"
              className="mb-8 px-4 py-1.5 text-sm font-medium border border-primary/30 bg-primary/10 text-primary"
            >
              <Shield className="w-3.5 h-3.5 mr-1.5" />
              {t("hero.badge")}
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold tracking-tight leading-[1.05] mb-6"
          >
            {t("hero.title1")}
            <br />
            <span className="gradient-text">{t("hero.title2")}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-5 leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* Pricing hook */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.1 }}
            className="mb-10"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 text-primary-foreground text-sm font-semibold animated-gradient shadow-[0_0_20px_oklch(0.75_0.17_75/0.25)]">
              ✦ {t("hero.pricingHook")}
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <a
              href="#contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 glow px-8 h-12 text-base bg-primary text-primary-foreground hero-btn-shine"
              )}
            >
              {t("hero.cta1")}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#process"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "gap-2 px-8 h-12 text-base border-border/60 text-foreground"
              )}
            >
              {t("hero.cta2")}
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-[88px] left-1/2 -translate-x-1/2 z-10 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground/40" />
        </motion.div>
      </motion.div>

      {/* ── Stats bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="absolute bottom-0 inset-x-0 z-10 glass border-t border-primary/10"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-2 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={cn(
                "text-center px-4 py-1",
                i < stats.length - 1 && "border-r border-border/30"
              )}
            >
              <div className="text-2xl sm:text-3xl font-bold gradient-text">
                <CountUp to={stat.to} suffix={stat.suffix} delay={1.6 + i * 0.1} />
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
