"use client";

import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/product/ProductCard";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CategoryShowcase({ categorySlug, categoryName, description }) {
  const { products, categories, loading } = useProducts();

  if (loading) return null;

  // Assuming category names/slugs match the seed data
  const targetCategory = categories.find(c => c.slug === categorySlug);
  
  let showcaseProducts = [];
  if (targetCategory) {
    showcaseProducts = products.filter(p => p.category === targetCategory.id).slice(0, 3);
  } else {
    // Fallback if slug mapping fails
    const fallbackMap = { men: "c1", women: "c2", formal: "c3", casual: "c4" };
    showcaseProducts = products.filter(p => p.category === fallbackMap[categorySlug]).slice(0, 3);
  }

  if (showcaseProducts.length === 0) return null;

  return (
    <section className="py-24 container mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
              {categoryName}
            </h2>
            <p className="text-muted-foreground font-light mb-8">
              {description}
            </p>
            <Button asChild variant="outline" className="rounded-full uppercase tracking-widest px-8">
              <Link href={`/products?category=${categorySlug}`}>
                Explore Category
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {showcaseProducts.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
