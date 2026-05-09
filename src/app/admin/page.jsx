"use client";

import { useState, useEffect } from "react";
import { getDbInstance } from "@/lib/db";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [coupons, setCoupons] = useState([]);

  const fetchData = async () => {
    const db = await getDbInstance();
    const p = await db.getAll("products");
    const c = await db.getAll("coupons");
    setProducts(p);
    setCoupons(c);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleCouponStatus = async (coupon) => {
    const db = await getDbInstance();
    coupon.isActive = !coupon.isActive;
    await db.put("coupons", coupon);
    toast.success(`Coupon ${coupon.code} updated.`);
    fetchData();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-24 container mx-auto px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">Admin Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Products Management */}
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold uppercase tracking-widest border-b border-border pb-4">Products & Inventory</h2>
            <div className="grid gap-4">
              {products.map(product => (
                <div key={product.id} className="p-4 rounded-xl border border-border bg-card flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] text-muted-foreground font-bold tracking-[0.2em] uppercase mb-1">{product.brand}</p>
                      <h3 className="font-bold text-sm leading-tight">{product.name}</h3>
                    </div>
                    <span className="font-semibold text-sm">{formatPrice(product.price)}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {product.variants.map(variant => (
                      <div key={variant.id} className="p-2 text-xs border border-border bg-background rounded-md flex flex-col items-center justify-center text-center">
                        <span className="font-bold uppercase mb-1">{variant.size}</span>
                        <span className="text-muted-foreground">{variant.stock} left</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Coupons Management */}
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold uppercase tracking-widest border-b border-border pb-4">Coupons</h2>
            <div className="grid gap-4">
              {coupons.map(coupon => (
                <div key={coupon.code} className="p-4 rounded-xl border border-border bg-card flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg font-mono uppercase">{coupon.code}</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">
                      {coupon.type === "percentage" ? `${coupon.value}% OFF` : `₹${coupon.value} FLAT`} 
                      {coupon.minCartValue > 0 && ` (Min ₹${coupon.minCartValue})`}
                    </p>
                  </div>
                  <Button 
                    variant={coupon.isActive ? "default" : "outline"} 
                    onClick={() => toggleCouponStatus(coupon)}
                    className="text-xs tracking-widest uppercase"
                  >
                    {coupon.isActive ? "Active" : "Disabled"}
                  </Button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
