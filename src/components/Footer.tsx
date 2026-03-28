"use client";

import { Sun, Facebook, Instagram, Linkedin } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";

export default function Footer() {
  const { t } = useTranslation();

  const serviceLinks = [
    t("footer.residentialSolar"),
    t("footer.commercialSolar"),
    t("footer.batteryStorage"),
    t("footer.evCharger"),
    t("footer.solarCarports"),
    t("footer.solarFarm"),
  ];

  const companyLinks = [
    t("footer.aboutUs"),
    t("footer.ourTeam"),
    t("footer.careers"),
    t("footer.blog"),
    t("footer.contact"),
  ];

  const resourceLinks = [
    t("footer.solarGuide"),
    t("footer.incentives"),
    t("footer.faq"),
    t("footer.warranty"),
    t("footer.referral"),
  ];

  const certBadges = ["Tesla Certified", "Enphase Platinum", "NABCEP", "CSLB Licensed", "BBB A+"];

  return (
    <footer className="border-t border-border/40 bg-card/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Cert badges strip */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 pb-8 border-b border-border/30">
          {certBadges.map((badge) => (
            <span
              key={badge}
              className="text-xs font-semibold text-primary/60 border border-primary/15 bg-primary/5 px-3 py-1 rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="inline-flex items-center justify-center mb-4">
              <img src="/images/logoR.png" alt="Nason Solar Logo" className="h-12 w-auto object-contain scale-[1.5] origin-left" />
            </div>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2 max-w-xs">
              {t("footer.tagline")}
            </p>
            <p className="text-xs text-primary/60 font-medium mb-6">{t("footer.license")}</p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-muted/40 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">{t("footer.services")}</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <a href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">{t("footer.company")}</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">{t("footer.resources")}</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">{t("footer.contactInfo")}</h4>
            <ul className="space-y-3">
              <li className="text-sm text-muted-foreground">{t("footer.address")}</li>
              <li>
                <a href="tel:+16266880123" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  (626) 688-0123
                </a>
              </li>
              <li>
                <a href="mailto:info@nasonsolar.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  info@nasonsolar.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {t("footer.copyright")}
          </p>
          <p className="text-sm text-primary/60 font-medium">{t("footer.veteran")}</p>
        </div>
      </div>
    </footer>
  );
}
