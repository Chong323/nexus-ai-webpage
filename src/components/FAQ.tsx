"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import { cn } from "@/lib/utils";

const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"];

function FAQItem({
  index,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-border/40 rounded-xl overflow-hidden bg-card/50 transition-colors hover:border-primary/30">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className={cn("font-medium text-sm leading-relaxed transition-colors", isOpen ? "text-primary" : "text-foreground")}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 mt-0.5"
        >
          <ChevronDown className={cn("w-4 h-4 transition-colors", isOpen ? "text-primary" : "text-muted-foreground")} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-3">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  const leftCol = faqKeys.slice(0, 4);
  const rightCol = faqKeys.slice(4, 8);

  return (
    <section id="faq" className="py-24 sm:py-32 bg-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-primary uppercase tracking-widest mb-3"
          >
            {t("faq.subtitle")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            {t("faq.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground"
          >
            {t("faq.description")}
          </motion.p>
        </div>

        {/* ── Desktop: two columns ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="hidden lg:grid grid-cols-2 gap-4"
        >
          {/* Left column — Q1-Q4 */}
          <div className="space-y-3">
            {leftCol.map((key, colIdx) => {
              const globalIdx = colIdx;
              return (
                <FAQItem
                  key={key}
                  index={globalIdx}
                  question={t(`faq.${key}`)}
                  answer={t(`faq.${key}a`)}
                  isOpen={openIndex === globalIdx}
                  onToggle={() => toggle(globalIdx)}
                />
              );
            })}
          </div>
          {/* Right column — Q5-Q8 */}
          <div className="space-y-3">
            {rightCol.map((key, colIdx) => {
              const globalIdx = colIdx + 4;
              return (
                <FAQItem
                  key={key}
                  index={globalIdx}
                  question={t(`faq.${key}`)}
                  answer={t(`faq.${key}a`)}
                  isOpen={openIndex === globalIdx}
                  onToggle={() => toggle(globalIdx)}
                />
              );
            })}
          </div>
        </motion.div>

        {/* ── Mobile: single column ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="lg:hidden space-y-3"
        >
          {faqKeys.map((key, i) => (
            <FAQItem
              key={key}
              index={i}
              question={t(`faq.${key}`)}
              answer={t(`faq.${key}a`)}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </motion.div>

        {/* Still have questions? */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12 text-sm text-muted-foreground"
        >
          {t("faq.stillHaveQuestions")}{" "}
          <a href="#contact" className="text-primary font-semibold hover:underline">
            {t("faq.contactUs")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
