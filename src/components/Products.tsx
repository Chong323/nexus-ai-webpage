"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Users, Wrench, Award, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/useTranslation";

const blocks = [
  {
    key: "block1",
    icon: Wrench,
    reverse: false,
    // IMAGE SLOT → /public/images/team-install.jpg (crew on rooftop photo)
    imageSlot: "team-install",
  },
  {
    key: "block2",
    icon: Users,
    reverse: true,
    // IMAGE SLOT → /public/images/team-founder.jpg (founder / veteran team photo)
    imageSlot: "team-founder",
  },
  {
    key: "block3",
    icon: Award,
    reverse: false,
    // IMAGE SLOT → /public/images/powerwall-install.jpg (Tesla Powerwall installation)
    imageSlot: "powerwall-install",
  },
];

function ParallaxImage({ imageSlot }: { imageSlot: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-24, 24]);

  return (
    <div
      ref={ref}
      className="relative rounded-2xl aspect-[4/3] overflow-hidden border border-border/40 bg-gradient-to-br from-muted/35 to-muted/15"
    >
      {/*
        Replace inner content with:
        <motion.div style={{ y }} className="absolute inset-[-8%] inset-x-0">
          <Image src={`/images/${imageSlot}.jpg`} fill className="object-cover" alt="" />
        </motion.div>
      */}
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/4 via-transparent to-primary/3" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground/30">
          <Camera className="w-12 h-12" />
          <span className="text-xs font-medium tracking-wide">/images/{imageSlot}.jpg</span>
        </div>
        <div className="absolute top-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </motion.div>
    </div>
  );
}

export default function Products() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 sm:py-32 bg-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-primary uppercase tracking-widest mb-3"
          >
            {t("whyUs.subtitle")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight"
          >
            {t("whyUs.title")}
          </motion.h2>
        </div>

        <div className="space-y-24">
          {blocks.map((b, idx) => {
            const blockKey = b.key as "block1" | "block2" | "block3";
            const features = [
              t(`whyUs.${blockKey}.feature1`),
              t(`whyUs.${blockKey}.feature2`),
              t(`whyUs.${blockKey}.feature3`),
              t(`whyUs.${blockKey}.feature4`),
            ];

            return (
              <motion.div
                key={b.key}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  b.reverse ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Text column */}
                <div className={b.reverse ? "lg:col-start-2" : ""}>
                  <Badge
                    variant="secondary"
                    className="mb-4 text-primary border-primary/20 bg-primary/10"
                  >
                    {t(`whyUs.${blockKey}.badge`)}
                  </Badge>
                  <h3 className="text-3xl font-bold mb-2">
                    {t(`whyUs.${blockKey}.name`)}
                  </h3>
                  <p className="text-primary font-medium mb-4">
                    {t(`whyUs.${blockKey}.tagline`)}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {t(`whyUs.${blockKey}.description`)}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  {idx === 0 && (
                    <a
                      href="#contact"
                      className={cn(buttonVariants(), "gap-2 bg-primary text-primary-foreground")}
                    >
                      {t("hero.cta1")}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Image column */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className={b.reverse ? "lg:col-start-1 lg:row-start-1" : ""}
                >
                  <ParallaxImage imageSlot={b.imageSlot} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
