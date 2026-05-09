"use client";

import { useProducts } from "@/hooks/useProducts";
import { motion } from "framer-motion";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export function ProductMarquee() {
  const { products, loading } = useProducts();

  if (loading || products.length === 0) return null;

  // Take 15 random products for the marquee
  const marqueeProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 15);

  return (
    <div className="w-full overflow-hidden bg-background border-b border-border py-6 flex flex-col gap-4">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Trending Now</h2>
      </div>
      <div className="relative flex overflow-x-hidden">
        <motion.div
          className="flex whitespace-nowrap gap-6 px-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {/* Double the array for seamless infinite scroll */}
          {[...marqueeProducts, ...marqueeProducts].map((product, idx) => (
            <Link 
              key={`${product.id}-${idx}`} 
              href={`/products/${product.id}`}
              className="flex items-center gap-4 p-2 rounded-xl border border-transparent hover:border-border hover:bg-card transition-colors w-64 group"
            >
              <div className="w-16 h-20 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                />
              </div>
              <div className="flex flex-col justify-center overflow-hidden">
                <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase mb-1">{product.brand}</p>
                <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                <span className="text-sm font-medium mt-1">{formatPrice(product.price)}</span>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
