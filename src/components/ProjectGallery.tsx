"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, MapPin, Zap, TrendingUp } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import { cn } from "@/lib/utils";

type Category = "all" | "residential" | "commercial" | "battery" | "ev";

interface Project {
  id: number;
  category: Exclude<Category, "all">;
  title: string;
  location: string;
  systemSize: string;
  annualSavings: string;
  // IMAGE SLOT: set imageSlot to the filename under /public/images/gallery/
  imageSlot: string;
}

const projects: Project[] = [
  {
    id: 1,
    category: "residential",
    title: "Arcadia Residence",
    location: "Arcadia, CA",
    systemSize: "12 kW + 2× Powerwall",
    annualSavings: "$4,200/yr",
    // IMAGE SLOT → /public/images/gallery/arcadia-residential.jpg (rooftop solar photo)
    imageSlot: "arcadia-residential",
  },
  {
    id: 2,
    category: "commercial",
    title: "Pasadena Office Complex",
    location: "Pasadena, CA",
    systemSize: "85 kW",
    annualSavings: "$28,000/yr",
    // IMAGE SLOT → /public/images/gallery/pasadena-commercial.jpg (commercial rooftop)
    imageSlot: "pasadena-commercial",
  },
  {
    id: 3,
    category: "ev",
    title: "San Gabriel Restaurant",
    location: "San Gabriel, CA",
    systemSize: "30 kW + 6 EV Chargers",
    annualSavings: "$11,400/yr",
    // IMAGE SLOT → /public/images/gallery/sg-ev.jpg (EV charger installation)
    imageSlot: "sg-ev",
  },
  {
    id: 4,
    category: "residential",
    title: "Temple City Home",
    location: "Temple City, CA",
    systemSize: "10 kW + Enphase Battery",
    annualSavings: "$3,600/yr",
    // IMAGE SLOT → /public/images/gallery/temple-city-residential.jpg (rooftop solar)
    imageSlot: "temple-city-residential",
  },
  {
    id: 5,
    category: "commercial",
    title: "Monrovia Warehouse",
    location: "Monrovia, CA",
    systemSize: "50 kW + BESS",
    annualSavings: "$18,000/yr",
    // IMAGE SLOT → /public/images/gallery/monrovia-commercial.jpg (commercial rooftop)
    imageSlot: "monrovia-commercial",
  },
  {
    id: 6,
    category: "battery",
    title: "Alhambra Backup System",
    location: "Alhambra, CA",
    systemSize: "8 kW + 3× Powerwall",
    annualSavings: "$2,900/yr",
    // IMAGE SLOT → /public/images/gallery/alhambra-battery.jpg (Powerwall install)
    imageSlot: "alhambra-battery",
  },
  {
    id: 7,
    category: "residential",
    title: "San Marino Estate",
    location: "San Marino, CA",
    systemSize: "18 kW + Powerwall",
    annualSavings: "$6,100/yr",
    // IMAGE SLOT → /public/images/gallery/san-marino-residential.jpg (rooftop solar)
    imageSlot: "san-marino-residential",
  },
  {
    id: 8,
    category: "ev",
    title: "Rosemead HOA",
    location: "Rosemead, CA",
    systemSize: "45 kW Carport + EV",
    annualSavings: "$16,500/yr",
    // IMAGE SLOT → /public/images/gallery/rosemead-carport.jpg (solar carport)
    imageSlot: "rosemead-carport",
  },
];

const categories: { value: Category; labelKey: string }[] = [
  { value: "all", labelKey: "gallery.filterAll" },
  { value: "residential", labelKey: "gallery.filterResidential" },
  { value: "commercial", labelKey: "gallery.filterCommercial" },
  { value: "battery", labelKey: "gallery.filterBattery" },
  { value: "ev", labelKey: "gallery.filterEV" },
];

export default function ProjectGallery() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [lightbox, setLightbox] = useState<Project | null>(null);

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-video">
                  <img src={`/images/gallery/${lightbox.imageSlot}.jpg`} className="absolute inset-0 w-full h-full object-cover" alt={lightbox.title} />
                </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{lightbox.title}</h3>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      {lightbox.location}
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20 capitalize flex-shrink-0">
                    {lightbox.category}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/30 rounded-xl p-4 border border-border/30">
                    <div className="text-xs text-muted-foreground mb-1">System Size</div>
                    <div className="font-semibold text-foreground">{lightbox.systemSize}</div>
                  </div>
                  <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                    <div className="text-xs text-muted-foreground mb-1">Est. Annual Savings</div>
                    <div className="font-semibold text-primary">{lightbox.annualSavings}</div>
                  </div>
                </div>
                <a
                  href="#contact"
                  onClick={() => setLightbox(null)}
                  className="mt-4 flex items-center justify-center h-10 rounded-xl bg-primary text-primary-foreground text-sm font-semibold w-full hover:opacity-90 transition-opacity"
                >
                  Get a Similar System →
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
