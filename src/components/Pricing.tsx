"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Phone, Mail, Sun, Clock, Calendar } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import QuoteForm from "@/components/QuoteForm";
import { useTranslation } from "@/i18n/useTranslation";
import { cn } from "@/lib/utils";

export default function Pricing() {
  const { t } = useTranslation();

  const benefits = [
    t("quote.benefit1"),
    t("quote.benefit2"),
    t("quote.benefit3"),
    t("quote.benefit4"),
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 bg-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-primary uppercase tracking-widest mb-3"
          >
            {t("quote.subtitle")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight"
          >
            {t("quote.title")}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: pitch */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Solar icon */}
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
              <Sun className="w-7 h-7 text-primary" />
            </div>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t("quote.description")}
            </p>

            <ul className="space-y-4 mb-8">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/80">{b}</span>
                </li>
              ))}
            </ul>

            {/* Response time indicator */}
            <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-primary flex-shrink-0" />
              <span>{t("quote.responseTime")}</span>
            </div>

            {/* Contact info */}
            <div className="space-y-3 p-6 bg-card/60 rounded-2xl border border-border/40">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                {t("quote.reachDirectly")}
              </p>
              <a
                href={`tel:${t("quote.phone").replace(/\D/g, "")}`}
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium">{t("quote.phone")}</span>
              </a>
              <a
                href={`mailto:${t("quote.email")}`}
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium">{t("quote.email")}</span>
              </a>

              {/* Schedule a Call */}
              <div className="pt-3 border-t border-border/40">
                <a
                  href={`tel:${t("quote.phone").replace(/\D/g, "")}`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "w-full gap-2 border-primary/30 text-primary hover:bg-primary/10"
                  )}
                >
                  <Calendar className="w-4 h-4" />
                  {t("quote.scheduleCall")}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card/60 border border-border/40 rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-xl font-bold mb-6">{t("quote.formTitle")}</h3>
            <QuoteForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
