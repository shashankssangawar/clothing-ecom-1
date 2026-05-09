"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="container relative z-10 px-4 flex flex-col items-center text-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4 max-w-4xl"
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-foreground mix-blend-difference">
            Redefine <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-muted-foreground">Your Reality</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light tracking-wide">
            High-contrast aesthetics meets cutting-edge tailoring. Step into the future of fashion.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button asChild size="lg" className="rounded-full h-14 px-8 text-base tracking-widest uppercase">
            <Link href="/products">Shop the drop</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-8 text-base tracking-widest uppercase bg-transparent backdrop-blur-md border-white/20 hover:bg-white/10 text-foreground">
            <Link href="#collections">View Lookbook</Link>
          </Button>
        </motion.div>
      </div>

      {/* Scrolling Text Marquee */}
      <div className="absolute bottom-10 left-0 right-0 overflow-hidden py-4 border-y border-border/40 glass">
        <motion.div 
          className="flex whitespace-nowrap gap-8"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-sm uppercase tracking-[0.2em] font-bold text-foreground/50">
              LUMEN DEMO PROJECT • NEXT-GEN AESTHETICS • 
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
