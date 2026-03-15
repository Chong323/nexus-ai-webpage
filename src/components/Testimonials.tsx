"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import { cn } from "@/lib/utils";

interface TestimonialItem {
  name: string;
  role: string;
  location: string;
  avatar: string;
  project: string;
  quote: string;
  stars: number;
}

const TESTIMONIAL_COUNT = 6;
const DESKTOP_PER_PAGE = 3;

export default function Testimonials() {
  const { t } = useTranslation();

  const testimonials = Array.from({ length: TESTIMONIAL_COUNT }, (_, i) => ({
    name: t(`testimonials.items.${i}.name`),
    role: t(`testimonials.items.${i}.role`),
    location: t(`testimonials.items.${i}.location`),
    avatar: t(`testimonials.items.${i}.avatar`),
    project: t(`testimonials.items.${i}.project`),
    quote: t(`testimonials.items.${i}.quote`),
    stars: 5,
  }));

  const desktopPages = Math.ceil(testimonials.length / DESKTOP_PER_PAGE);
  const [desktopPage, setDesktopPage] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = (dir: number, isMobile: boolean) => {
    setDirection(dir);
    if (isMobile) {
      setMobileIndex((prev) =>
        (prev + dir + testimonials.length) % testimonials.length
      );
    } else {
      setDesktopPage((prev) => (prev + dir + desktopPages) % desktopPages);
    }
  };

  const visibleDesktop = testimonials.slice(
    desktopPage * DESKTOP_PER_PAGE,
    desktopPage * DESKTOP_PER_PAGE + DESKTOP_PER_PAGE
  );

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 48 : -48 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -48 : 48 }),
  };

  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-primary uppercase tracking-widest mb-3"
          >
            {t("testimonials.subtitle")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            {t("testimonials.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            {t("testimonials.description")}
          </motion.p>
        </div>

        {/* Google Rating Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-card/70 border border-border/50">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <div>
              <div className="text-lg font-bold leading-none">4.9 / 5</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {t("testimonials.googleLabel")}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Desktop: 3-card paginated ── */}
        <div className="hidden lg:block relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={desktopPage}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-3 gap-6"
            >
              {visibleDesktop.map((item, i) => (
                <TestimonialCard key={item.name} item={item} delay={i * 0.05} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => paginate(-1, false)}
              className="w-9 h-9 rounded-full border border-border/50 bg-card/60 flex items-center justify-center hover:border-primary/40 hover:text-primary transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {/* Dots */}
            {Array.from({ length: desktopPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > desktopPage ? 1 : -1); setDesktopPage(i); }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  i === desktopPage ? "bg-primary w-5" : "bg-border/60 hover:bg-primary/40"
                )}
                aria-label={`Page ${i + 1}`}
              />
            ))}
            <button
              onClick={() => paginate(1, false)}
              className="w-9 h-9 rounded-full border border-border/50 bg-card/60 flex items-center justify-center hover:border-primary/40 hover:text-primary transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Mobile: single card slider ── */}
        <div className="lg:hidden relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={mobileIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <TestimonialCard item={testimonials[mobileIndex]} />
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => paginate(-1, true)}
              className="w-9 h-9 rounded-full border border-border/50 bg-card/60 flex items-center justify-center hover:border-primary/40 hover:text-primary transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > mobileIndex ? 1 : -1); setMobileIndex(i); }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  i === mobileIndex ? "bg-primary w-5" : "bg-border/60"
                )}
                aria-label={`Review ${i + 1}`}
              />
            ))}
            <button
              onClick={() => paginate(1, true)}
              className="w-9 h-9 rounded-full border border-border/50 bg-card/60 flex items-center justify-center hover:border-primary/40 hover:text-primary transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  item,
  delay = 0,
}: {
  item: TestimonialItem;
  delay?: number;
}) {
  return (
    <Card className="h-full card-hover border-border/40 bg-card/80">
      <CardContent className="pt-6">
        <div className="flex gap-0.5 mb-3">
          {[...Array(item.stars)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
          ))}
        </div>
        <blockquote className="text-sm leading-relaxed text-foreground/80 mb-4">
          &ldquo;{item.quote}&rdquo;
        </blockquote>
        <div className="text-xs text-primary/70 font-medium mb-4 italic">
          {item.project}
        </div>
        <div className="flex items-center gap-3">
          {/*
            AVATAR SLOT — replace the div below with:
            <Image src={`/images/avatar-${item.avatar.toLowerCase()}.jpg`} width={36} height={36} className="rounded-full object-cover" alt={item.name} />
          */}
          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
            {item.avatar}
          </div>
          <div>
            <div className="font-semibold text-sm">{item.name}</div>
            <div className="text-xs text-muted-foreground">
              {item.role} · {item.location}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
