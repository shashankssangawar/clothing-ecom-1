"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BentoGrid() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section id="collections" className="py-24 container mx-auto px-4 md:px-6">
      <div className="mb-12 flex justify-between items-end">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Curated <br/> <span className="text-muted-foreground">Selections</span></h2>
        <Link href="/products" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
          View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-[1200px] md:h-[800px]"
      >
        {/* Large Featured Category */}
        <motion.div variants={item} className="md:col-span-2 md:row-span-2 bento-card relative group">
          <Link href="/products?category=women" className="absolute inset-0 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200" 
            alt="Women's Collection"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-8 left-8 text-white pointer-events-none">
            <h3 className="text-3xl font-bold uppercase tracking-widest mb-2">Women</h3>
            <p className="text-white/80 font-light max-w-xs">Ethereal silhouettes and sharp tailoring for the modern muse.</p>
          </div>
        </motion.div>

        {/* Medium Top Right */}
        <motion.div variants={item} className="md:col-span-2 md:row-span-1 bento-card relative group bg-primary">
          <Link href="/products?category=men" className="absolute inset-0 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=800" 
            alt="Men's Collection"
            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 text-white pointer-events-none">
            <h3 className="text-2xl font-bold uppercase tracking-widest">Men</h3>
          </div>
        </motion.div>

        {/* Small Square 1 */}
        <motion.div variants={item} className="md:col-span-1 md:row-span-1 bento-card relative group overflow-hidden flex items-center justify-center bg-card">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="text-center p-6 z-10">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4 block">Promo</span>
            <h3 className="text-4xl font-black tracking-tighter mb-2">₹100<br/>OFF</h3>
            <p className="text-xs uppercase tracking-widest">Use Code: SAVE100</p>
          </div>
        </motion.div>

        {/* Small Square 2 */}
        <motion.div variants={item} className="md:col-span-1 md:row-span-1 bento-card relative group bg-secondary">
          <Link href="/products?category=accessories" className="absolute inset-0 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800" 
            alt="Accessories"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-white">
            <h3 className="text-xl font-bold uppercase tracking-widest">Accessories</h3>
          </div>
        </motion.div>

        {/* Bottom Long Card */}
        <motion.div variants={item} className="md:col-span-4 md:row-span-1 bento-card relative group">
          <Link href="/products?category=formal" className="absolute inset-0 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1600" 
            alt="Formal Wear"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
          <div className="absolute top-1/2 -translate-y-1/2 left-8 md:left-12 text-white pointer-events-none">
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-4">Formal<br/>Edition</h3>
            <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
              Explore <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
