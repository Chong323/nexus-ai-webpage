"use client";

import { useTranslation } from "@/i18n/useTranslation";

const certs = [
  { key: "tesla", label: "Tesla Certified" },
  { key: "enphase", label: "Enphase Platinum" },
  { key: "nabcep", label: "NABCEP Certified" },
  { key: "cslb", label: "CSLB Licensed" },
  { key: "bbb", label: "BBB Accredited" },
];

function CertBadge({ certKey }: { certKey: string }) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-3 px-6 py-3 rounded-xl border border-border/40 bg-muted/15 shrink-0 mx-4">
      {/*
        LOGO SLOT — replace the div below with:
        <Image src={`/logos/${certKey}.svg`} alt={t(`certifications.${certKey}`)} width={80} height={32} className="opacity-70 hover:opacity-100 transition-opacity" />
      */}
      <div className="w-[72px] h-7 rounded bg-muted/40 flex items-center justify-center">
        <span className="text-[10px] font-bold text-muted-foreground/70 tracking-wide uppercase">
          {certKey}
        </span>
      </div>
      <span className="text-sm font-semibold text-foreground/70 whitespace-nowrap">
        {t(`certifications.${certKey}`)}
      </span>
    </div>
  );
}

export default function Certifications() {
  const { t } = useTranslation();

  return (
    <section className="py-10 border-y border-border/40 bg-card/30 overflow-hidden">
      <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-7">
        {t("certifications.title")}
      </p>

      {/* Marquee wrapper */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-card/50 to-transparent" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-card/50 to-transparent" />

        {/* Scrolling track — items duplicated for seamless loop */}
        <div className="flex marquee-track">
          {[...certs, ...certs].map((cert, i) => (
            <CertBadge key={`${cert.key}-${i}`} certKey={cert.key} />
          ))}
        </div>
      </div>
    </section>
  );
}
