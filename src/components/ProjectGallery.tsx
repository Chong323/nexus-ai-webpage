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
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-primary uppercase tracking-widest mb-3"
          >
            {t("gallery.subtitle")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            {t("gallery.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground"
          >
            {t("gallery.description")}
          </motion.p>
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                activeFilter === cat.value
                  ? "bg-primary text-primary-foreground shadow-[0_0_16px_oklch(0.75_0.17_75/0.35)]"
                  : "border border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
            >
              {t(cat.labelKey)}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
              >
                <button
                  onClick={() => setLightbox(project)}
                  className="w-full text-left group"
                  aria-label={`View ${project.title}`}
                >
                  <div className="relative rounded-2xl overflow-hidden border border-border/40 bg-card/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/30 group-hover:shadow-[0_16px_32px_oklch(0.75_0.17_75/0.1)]">
                    {/*
                      IMAGE SLOT — replace with:
                      <div className="relative aspect-[4/3]">
                        <Image src={`/images/gallery/${project.imageSlot}.jpg`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" alt={project.title} />
                      </div>
                    */}
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-muted/40 to-muted/20 flex items-center justify-center overflow-hidden">
                      <img src={`/images/gallery/${project.imageSlot}.jpg`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={project.title} />
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <div className="flex items-center gap-1.5 text-xs text-primary/80 mb-1">
                        <Zap className="w-3 h-3" />
                        <span>{project.systemSize}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-primary/80">
                        <TrendingUp className="w-3 h-3" />
                        <span>{project.annualSavings}</span>
                      </div>
                    </div>

                    {/* Category pill */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 rounded-full bg-background/80 backdrop-blur-sm text-[10px] font-semibold text-primary/80 border border-primary/20 capitalize">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="px-1 pt-3 pb-1">
                    <h3 className="font-semibold text-sm text-foreground">{project.title}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{project.location}</span>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-2xl w-full bg-card rounded-2xl border border-border/50 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/*
                LIGHTBOX IMAGE SLOT — replace with:
                <div className="relative aspect-video">
                  <Image src={`/images/gallery/${lightbox.imageSlot}.jpg`} fill className="object-cover" alt={lightbox.title} />
                </div>
              */}
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
