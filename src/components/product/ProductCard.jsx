"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/Button";

export function ProductCard({ product }) {
  const { addToCart } = useCart();
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="group flex flex-col gap-3">
      <Link href={`/products/${product.id}`} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary">
        <img
          src={product.images[0]}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate`}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isFeatured && (
            <Badge variant="secondary" className="glass bg-white/20 text-white border-white/10 uppercase tracking-widest text-[10px]">Featured</Badge>
          )}
          {hasDiscount && (
            <Badge variant="destructive" className="uppercase tracking-widest text-[10px]">Sale</Badge>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Button 
            className="w-full rounded-full uppercase tracking-widest text-xs glass bg-white/20 hover:bg-white/40 text-white border-white/20"
            onClick={(e) => {
              e.preventDefault(); // Prevent navigating to product detail
              // Default add the first available variant
              const availableVariant = product.variants.find(v => v.stock > 0);
              if (availableVariant) {
                addToCart(product, availableVariant, 1);
              }
            }}
          >
            Quick Add
          </Button>
        </div>
      </Link>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start gap-2">
          <div>
            <p className="text-xs text-muted-foreground font-bold tracking-widest uppercase mb-1">{product.brand}</p>
            <Link href={`/products/${product.id}`} className="font-semibold text-foreground hover:underline underline-offset-4 line-clamp-1">
              {product.name}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium">
          <span>{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className="text-muted-foreground line-through text-xs">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
