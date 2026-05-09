"use client";

import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/product/ProductCard";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Loader2, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";

export default function ProductsPage() {
  const { products, loading } = useProducts();
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");
  
  const [activeSort, setActiveSort] = useState("newest");

  const filteredProducts = useMemo(() => {
    let p = [...products];
    if (categoryFilter) {
      // Find the category ID matching the slug (e.g. 'men' -> 'c1')
      // Note: We'll do a simple match assuming slug maps correctly, 
      // but ideally we'd look up the category ID from the `categories` list.
      const categoryMap = { men: "c1", women: "c2", formal: "c3", casual: "c4" };
      const catId = categoryMap[categoryFilter];
      if (catId) {
        p = p.filter(item => item.category === catId);
      }
    }

    if (activeSort === "price-low") p.sort((a, b) => a.price - b.price);
    if (activeSort === "price-high") p.sort((a, b) => b.price - a.price);

    return p;
  }, [products, categoryFilter, activeSort]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-16 container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">
              {categoryFilter ? categoryFilter : "All Products"}
            </h1>
            <p className="text-muted-foreground text-sm uppercase tracking-widest">
              {filteredProducts.length} items
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground mr-2">Sort</span>
            <Button 
              variant={activeSort === "newest" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setActiveSort("newest")}
              className="text-xs tracking-widest uppercase rounded-full"
            >
              Newest
            </Button>
            <Button 
              variant={activeSort === "price-low" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setActiveSort("price-low")}
              className="text-xs tracking-widest uppercase rounded-full"
            >
              Price: Low
            </Button>
            <Button 
              variant={activeSort === "price-high" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setActiveSort("price-high")}
              className="text-xs tracking-widest uppercase rounded-full"
            >
              Price: High
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-24 text-muted-foreground uppercase tracking-widest text-sm">
            No products found matching your criteria.
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
