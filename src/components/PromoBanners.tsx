"use client";

import { motion } from "framer-motion";
import { FileText, Gift, ArrowRight } from "lucide-react";

export default function PromoBanners() {
  return (
    <section className="py-16 sm:py-24 bg-card border-y border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Buyer's Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-primary/5 border border-primary/20 p-8 sm:p-10 flex flex-col justify-center group hover:border-primary/40 transition-colors"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileText className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
              The Ultimate Solar Buyers Guide
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Learn how to select the right solar equipment, identify top installers, and maximize your tax incentives in our free downloadable guide.
            </p>
            <div>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md h-11 px-8"
              >
                Download Free Guide
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Referral Program */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl bg-card border border-border/60 shadow-sm p-8 sm:p-10 flex flex-col justify-center group hover:border-green-500/30 hover:shadow-md transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Gift className="w-7 h-7 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
              Refer a Friend, Earn $500!
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Know someone who needs solar or a new roof? Refer family and friends and earn a $500 cash reward for every successful installation.
            </p>
            <div>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-2 border-primary text-primary hover:bg-primary/5 h-11 px-8"
              >
                Start Referring
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}