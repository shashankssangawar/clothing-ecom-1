"use client";

import { useCart } from "@/hooks/useCart";
import { useCoupon } from "@/hooks/useCoupon";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { formatPrice, cn } from "@/lib/utils";
import { Trash2, Plus, Minus, ArrowRight, Ticket } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, subtotal, checkout } = useCart();
  const { activeCoupon, applyCouponCode, removeCoupon, discount, finalTotal, coupons } = useCoupon(cartItems);
  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState(null);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCouponCode(couponInput);
    setCouponMsg({ text: res.message, isError: !res.success });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-24 container mx-auto px-4 md:px-6 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-xl text-muted-foreground uppercase tracking-widest mb-8">Your cart is empty</p>
            <Button asChild size="lg" className="rounded-full uppercase tracking-widest px-8">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4 md:gap-6 p-4 rounded-2xl border border-border bg-card">
                  <div className="w-24 h-32 md:w-32 md:h-40 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="text-[10px] md:text-xs text-muted-foreground font-bold tracking-[0.2em] uppercase mb-1">{item.brand}</p>
                        <h3 className="font-bold text-sm md:text-base leading-tight mb-2 line-clamp-2">{item.name}</h3>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">Size: {item.size}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-sm md:text-base">{formatPrice(item.price)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-border rounded-lg bg-background">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors rounded-l-lg"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors rounded-r-lg"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 p-6 rounded-3xl border border-border bg-card flex flex-col gap-6">
                <h2 className="text-xl font-bold uppercase tracking-widest">Order Summary</h2>
                
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  {activeCoupon && (
                    <div className="flex justify-between text-primary font-medium">
                      <span>Discount ({activeCoupon})</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  
                  <div className="w-full h-px bg-border my-2" />
                  
                  <div className="flex justify-between font-bold text-lg md:text-xl">
                    <span>Total</span>
                    <span>{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Promo Code</span>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Enter code"
                      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring uppercase placeholder:normal-case"
                      disabled={!!activeCoupon}
                    />
                    {activeCoupon ? (
                      <Button type="button" variant="outline" onClick={removeCoupon}>Remove</Button>
                    ) : (
                      <Button type="submit" variant="secondary">Apply</Button>
                    )}
                  </form>
                  {couponMsg && (
                    <p className={cn("text-xs mt-1", couponMsg.isError ? "text-destructive" : "text-green-500")}>
                      {couponMsg.text}
                    </p>
                  )}
                  
                  <div className="mt-4 p-4 rounded-xl bg-muted/50 border border-border/50 text-xs text-muted-foreground">
                    <p className="font-bold mb-2 uppercase tracking-widest text-foreground">Available Demo Codes:</p>
                    <ul className="space-y-1">
                      <li>• <span className="font-mono text-foreground">WELCOME25</span> (25% off)</li>
                      <li>• <span className="font-mono text-foreground">SAVE100</span> (₹100 flat off)</li>
                    </ul>
                  </div>
                </div>

                <Button 
                  onClick={async () => {
                    const res = await checkout(finalTotal, discount, activeCoupon);
                    if (res.success) {
                      window.location.href = `/order-success?id=${res.orderId}`;
                    }
                  }}
                  className="w-full h-14 rounded-xl text-sm font-bold tracking-widest uppercase mt-4 gap-2"
                >
                  Checkout <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
