"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sun,
  Building2,
  Battery,
  Plug,
  Car,
  Landmark,
  ArrowRight,
  Camera,
} from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Sun,
    key: "residential",
    // IMAGE SLOT → /public/images/service-residential.jpg (rooftop solar panel photo)
  },
  {
    icon: Building2,
    key: "commercial",
    // IMAGE SLOT → /public/images/service-commercial.jpg (commercial rooftop)
  },
  {
    icon: Battery,
    key: "battery",
    // IMAGE SLOT → /public/images/service-battery.jpg (Powerwall install)
  },
  {
    icon: Plug,
    key: "ev",
    // IMAGE SLOT → /public/images/service-ev.jpg (EV charger photo)
  },
  {
    icon: Car,
    key: "carport",
    // IMAGE SLOT → /public/images/service-carport.jpg (solar carport)
  },
  {
    icon: Landmark,
    key: "farm",
    // IMAGE SLOT → /public/images/service-farm.jpg (solar farm)
  },
];

export default function Features() {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-24 sm:py-32 bg-muted/20">
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
            {t("services.subtitle")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            {t("services.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            {t("services.description")}
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <Card className={cn(
                  "h-full border-border/40 bg-card/80 overflow-hidden group",
                  "transition-all duration-300 hover:-translate-y-1.5",
                  "hover:border-primary/30 card-inner-glow"
                )}>
                  {/*
                    IMAGE SLOT — replace the placeholder below with:
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={`/images/service-${s.key}.jpg`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        alt={t(`services.${s.key}.title`)}
                      />
                    </div>
                  */}
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-muted/40 to-muted/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-muted-foreground/25" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-28 h-28 bg-primary/6 rounded-full blur-2xl" />
                  </div>

                  <CardContent className="pt-5 pb-6 px-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-base text-foreground">
                        {t(`services.${s.key}.title`)}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {t(`services.${s.key}.description`)}
                    </p>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      {t("services.learnMore")}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
