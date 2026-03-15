"use client";

import { useState, useEffect } from "react";
import { motion, animate } from "framer-motion";
import { ArrowRight, Zap, DollarSign, Leaf, Sun } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Calculation constants (Southern California averages)
const ELECTRICITY_RATE = 0.35; // $/kWh — SCE/LADWP average
const PEAK_SUN_HOURS = 5.5;    // daily peak sun hours in LA area
const SYSTEM_EFFICIENCY = 0.85;
const OFFSET_RATE = 0.85;      // solar covers ~85% of bill
const RATE_ESCALATION = 1.30;  // 30% more expensive over 25 years (avg 1.3%/yr)
const CO2_LBS_PER_KWH = 0.386; // CA grid average

function calcResults(monthlyBill: number) {
  const monthlyKwh = monthlyBill / ELECTRICITY_RATE;
  const systemKw = Math.max(
    2,
    Math.round((monthlyKwh / (PEAK_SUN_HOURS * 30 * SYSTEM_EFFICIENCY)) * 10) / 10
  );
  const monthlySavings = Math.round(monthlyBill * OFFSET_RATE);
  const annualSavings = monthlySavings * 12;
  const twentyFiveYearSavings = Math.round(annualSavings * 25 * RATE_ESCALATION);
  const co2TonsPerYear = (monthlyKwh * OFFSET_RATE * 12 * CO2_LBS_PER_KWH) / 2000;
  const co2Tons25yr = Math.round(co2TonsPerYear * 25);
  return { systemKw, monthlySavings, annualSavings, twentyFiveYearSavings, co2Tons25yr };
}

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const controls = animate(display, value, {
      duration: 0.6,
      ease: "easeOut",
      onUpdate(v) { setDisplay(Math.round(v)); },
    });
    return controls.stop;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}

export default function SavingsCalculator() {
  const { t } = useTranslation();
  const [monthlyBill, setMonthlyBill] = useState(250);
  const results = calcResults(monthlyBill);

  const outputs = [
    {
      icon: Sun,
      label: t("calculator.systemSize"),
      value: results.systemKw,
      prefix: "",
      suffix: " kW",
      color: "text-primary",
      bg: "bg-primary/10 border-primary/20",
    },
    {
      icon: DollarSign,
      label: t("calculator.monthlySavings"),
      value: results.monthlySavings,
      prefix: "$",
      suffix: "/mo",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10 border-emerald-400/20",
    },
    {
      icon: Zap,
      label: t("calculator.twentyFiveYearSavings"),
      value: results.twentyFiveYearSavings,
      prefix: "$",
      suffix: "",
      color: "text-amber-400",
      bg: "bg-amber-400/10 border-amber-400/20",
    },
    {
      icon: Leaf,
      label: t("calculator.co2Offset"),
      value: results.co2Tons25yr,
      prefix: "",
      suffix: " tons",
      color: "text-teal-400",
      bg: "bg-teal-400/10 border-teal-400/20",
    },
  ];

  return (
    <section id="calculator" className="py-24 sm:py-32 bg-muted/10 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-primary uppercase tracking-widest mb-3"
          >
            {t("calculator.subtitle")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            {t("calculator.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground"
          >
            {t("calculator.description")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="bg-card/60 border border-border/40 rounded-3xl p-8 sm:p-10"
        >
          {/* Slider */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-foreground">
                {t("calculator.sliderLabel")}
              </label>
              <span className="text-2xl font-bold gradient-text">
                ${monthlyBill}/mo
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={1000}
              step={10}
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(Number(e.target.value))}
              className="w-full h-2 rounded-full cursor-pointer appearance-none bg-muted/50"
              style={{
                accentColor: "oklch(0.75 0.17 75)",
                background: `linear-gradient(to right, oklch(0.75 0.17 75) 0%, oklch(0.75 0.17 75) ${((monthlyBill - 50) / 950) * 100}%, oklch(0.22 0.035 255) ${((monthlyBill - 50) / 950) * 100}%, oklch(0.22 0.035 255) 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>$50</span>
              <span>$1,000+</span>
            </div>
          </div>

          {/* Output grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {outputs.map((out, i) => {
              const Icon = out.icon;
              return (
                <div
                  key={i}
                  className={cn("rounded-2xl p-4 border text-center", out.bg)}
                >
                  <div className="flex justify-center mb-2">
                    <Icon className={cn("w-5 h-5", out.color)} />
                  </div>
                  <div className={cn("text-xl sm:text-2xl font-bold tabular-nums", out.color)}>
                    <AnimatedNumber
                      value={out.value}
                      prefix={out.prefix}
                      suffix={out.suffix}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 leading-tight">
                    {out.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-4">
              {t("calculator.disclaimer")}
            </p>
            <a
              href="#contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 bg-primary text-primary-foreground glow px-8"
              )}
            >
              {t("calculator.cta")}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
