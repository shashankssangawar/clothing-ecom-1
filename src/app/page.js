"use client";

import { useDb } from "@/hooks/useDb";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { ProductMarquee } from "@/components/landing/ProductMarquee";
import { BentoGrid } from "@/components/landing/BentoGrid";
import { FeaturedProducts } from "@/components/landing/FeaturedProducts";
import { CategoryShowcase } from "@/components/landing/CategoryShowcase";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { isReady } = useDb();

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ProductMarquee />
        <FeaturedProducts />
        <BentoGrid />
        <CategoryShowcase 
          categorySlug="men" 
          categoryName="Men's Edition" 
          description="A study in architectural silhouettes and uncompromising utility. Built for the modern environment." 
        />
        <div className="h-px bg-border max-w-7xl mx-auto" />
        <CategoryShowcase 
          categorySlug="women" 
          categoryName="Women's Edition" 
          description="Ethereal textures meeting sharp tailoring. Pieces that transcend seasons and redefine expectations." 
        />
      </main>
      <Footer />
    </>
  );
}
