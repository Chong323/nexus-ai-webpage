"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/i18n/useTranslation";
import { CheckCircle2 } from "lucide-react";

const fieldAnim = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
});

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  projectType: string;
  electricBill: string;
  notes: string;
}

export default function QuoteForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    projectType: "",
    electricBill: "",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2">{t("quote.success")}</h3>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <motion.div {...fieldAnim(0)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-1.5">
            {t("quote.name")} <span className="text-primary">*</span>
          </label>
          <Input
            name="name"
            placeholder={t("quote.namePlaceholder")}
            value={form.name}
            onChange={handleChange}
            required
            className="bg-muted/30 border-border/50 input-glow"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-1.5">
            {t("quote.phoneField")} <span className="text-primary">*</span>
          </label>
          <Input
            name="phone"
            type="tel"
            placeholder={t("quote.phonePlaceholder")}
            value={form.phone}
            onChange={handleChange}
            required
            className="bg-muted/30 border-border/50 input-glow"
          />
        </div>
      </motion.div>

      <motion.div {...fieldAnim(0.07)}>
        <label className="block text-sm font-medium text-foreground/80 mb-1.5">
          {t("quote.emailField")} <span className="text-primary">*</span>
        </label>
        <Input
          name="email"
          type="email"
          placeholder={t("quote.emailPlaceholder")}
          value={form.email}
          onChange={handleChange}
          required
          className="bg-muted/30 border-border/50 input-glow"
        />
      </motion.div>

      <motion.div {...fieldAnim(0.14)}>
        <label className="block text-sm font-medium text-foreground/80 mb-1.5">
          {t("quote.address")} <span className="text-primary">*</span>
        </label>
        <Input
          name="address"
          placeholder={t("quote.addressPlaceholder")}
          value={form.address}
          onChange={handleChange}
          required
          className="bg-muted/30 border-border/50 input-glow"
        />
      </motion.div>

      <motion.div {...fieldAnim(0.21)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-1.5">
            {t("quote.projectType")} <span className="text-primary">*</span>
          </label>
          <select
            name="projectType"
            value={form.projectType}
            onChange={handleChange}
            required
            className="input-glow w-full h-10 rounded-md border border-border/50 bg-muted/30 px-3 py-2 text-sm text-foreground focus:outline-none"
          >
            <option value="" disabled>
              — Select —
            </option>
            <option value="residential">{t("quote.projectTypes.residential")}</option>
            <option value="commercial">{t("quote.projectTypes.commercial")}</option>
            <option value="battery">{t("quote.projectTypes.battery")}</option>
            <option value="ev">{t("quote.projectTypes.ev")}</option>
            <option value="carport">{t("quote.projectTypes.carport")}</option>
            <option value="other">{t("quote.projectTypes.other")}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-1.5">
            {t("quote.electricBill")}
          </label>
          <select
            name="electricBill"
            value={form.electricBill}
            onChange={handleChange}
            className="input-glow w-full h-10 rounded-md border border-border/50 bg-muted/30 px-3 py-2 text-sm text-foreground focus:outline-none"
          >
            <option value="">{t("quote.electricBills.placeholder")}</option>
            <option value="under100">{t("quote.electricBills.range1")}</option>
            <option value="100-200">{t("quote.electricBills.range2")}</option>
            <option value="200-400">{t("quote.electricBills.range3")}</option>
            <option value="400-600">{t("quote.electricBills.range4")}</option>
            <option value="over600">{t("quote.electricBills.range5")}</option>
          </select>
        </div>
      </motion.div>

      <motion.div {...fieldAnim(0.28)}>
        <label className="block text-sm font-medium text-foreground/80 mb-1.5">
          {t("quote.notes")}
        </label>
        <Textarea
          name="notes"
          placeholder={t("quote.notesPlaceholder")}
          value={form.notes}
          onChange={handleChange}
          rows={3}
          className="bg-muted/30 border-border/50 resize-none input-glow"
        />
      </motion.div>

      {status === "error" && (
        <p className="text-sm text-destructive">{t("quote.error")}</p>
      )}

      <motion.div {...fieldAnim(0.35)}>
        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow hero-btn-shine"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? t("quote.submitting") : t("quote.submit")}
        </Button>
      </motion.div>
    </form>
  );
}
