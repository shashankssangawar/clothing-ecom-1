"use client";

import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Loader2, ArrowLeft } from "lucide-react";
import { useState, useMemo } from "react";
import Link from "next/link";
import { formatPrice, cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function ProductPageClient({ params }) {
  const { id } = params;
  const { products, loading: productsLoading } = useProducts();
  const { addToCart } = useCart();

  const product = useMemo(() => products.find(p => p.id === id), [products, id]);

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  // Initialize selected variant once product loads
  if (product && !selectedVariant) {
    const defaultVariant = product.variants.find(v => v.stock > 0) || product.variants[0];
    setSelectedVariant(defaultVariant);
  }

  if (productsLoading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {productsLoading ? <Loader2 className="w-8 h-8 animate-spin text-primary" /> : <p className="text-muted-foreground uppercase tracking-widest text-sm">Product not found</p>}
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedVariant && selectedVariant.stock > 0) {
      addToCart(product, selectedVariant, 1);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-24 container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Images Section */}
          <div className="flex flex-col gap-4">
            <div className="aspect-[3/4] lg:aspect-[4/5] overflow-hidden bg-secondary rounded-2xl">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "relative w-20 h-24 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all",
                    activeImage === idx ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground font-bold tracking-[0.3em] uppercase mb-4">{product.brand}</p>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">{product.name}</h1>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-2xl font-medium">{formatPrice(product.price)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="w-full h-px bg-border my-8" />

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold uppercase tracking-widest">Select Size</h3>
                {selectedVariant && (
                  <span className={cn("text-xs font-medium uppercase tracking-widest", selectedVariant.stock < 5 ? "text-destructive" : "text-muted-foreground")}>
                    {selectedVariant.stock > 0 ? `${selectedVariant.stock} left` : "Out of stock"}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-4 gap-3">
                {product.variants.map(variant => {
                  const isSelected = selectedVariant?.id === variant.id;
                  const isOutOfStock = variant.stock === 0;

                  return (
                    <button
                      key={variant.id}
                      disabled={isOutOfStock}
                      onClick={() => setSelectedVariant(variant)}
                      className={cn(
                        "h-12 rounded-lg border flex items-center justify-center text-sm font-semibold uppercase transition-all",
                        isSelected ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background hover:border-primary/50",
                        isOutOfStock && "opacity-40 cursor-not-allowed line-through hover:border-input"
                      )}
                    >
                      {variant.size}
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              size="lg"
              className="w-full h-16 rounded-xl text-lg font-bold tracking-widest uppercase mb-6"
              disabled={!selectedVariant || selectedVariant.stock === 0}
              onClick={handleAddToCart}
            >
              {!selectedVariant ? "Select a size" : selectedVariant.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>

            <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
              <p className="font-light leading-relaxed">
                Elevate your wardrobe with the {product.name}. Crafted with precision and uncompromising quality, this piece represents the pinnacle of modern tailoring from {product.brand}.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
