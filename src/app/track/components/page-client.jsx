"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { getDbInstance } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { Search, Package, Truck, CheckCircle2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TrackingPageClient({ searchParams }) {
  const initialOrderId = searchParams?.id || "";

  const [orderId, setOrderId] = useState(initialOrderId);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialOrderId) {
      handleTrack({ preventDefault: () => { } }, initialOrderId);
    }
  }, [initialOrderId]);

  const handleTrack = async (e, forceId = null) => {
    e.preventDefault();
    const targetId = forceId || orderId;
    if (!targetId.trim()) return;

    setLoading(true);
    setError(null);
    setOrder(null);

    const db = await getDbInstance();
    const foundOrder = await db.get("orders", targetId.trim().toUpperCase());

    // Artificial delay for UI polish
    setTimeout(() => {
      setLoading(false);
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setError("Order not found. Please check your order ID and try again.");
      }
    }, 600);
  };

  const statuses = [
    { id: "PLACED", label: "Order Placed", icon: Package },
    { id: "DISPATCHED", label: "Dispatched", icon: Truck },
    { id: "IN_TRANSIT", label: "In Transit", icon: MapPin },
    { id: "DELIVERED", label: "Delivered", icon: CheckCircle2 },
  ];

  const getStatusIndex = (status) => {
    return statuses.findIndex((s) => s.id === status);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Track Your Order</h1>
          <p className="text-muted-foreground font-light max-w-md">
            Enter your order number below to check the real-time status of your shipment.
          </p>
        </div>

        <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm mb-12">
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="e.g. ORD-1A2B3C4D5"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-xl border border-input bg-background text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary uppercase placeholder:normal-case"
              />
            </div>
            <Button type="submit" disabled={loading} size="lg" className="h-14 rounded-xl px-8 uppercase tracking-widest font-bold">
              {loading ? "Searching..." : "Track"}
            </Button>
          </form>
          {error && <p className="text-destructive mt-4 text-sm font-medium text-center">{error}</p>}
        </div>

        {order && (
          <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-sm animate-in slide-in-from-bottom-8 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 pb-6 border-b border-border gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">Order Number</p>
                <h2 className="text-2xl font-mono font-bold">{order.id}</h2>
              </div>
              <div className="md:text-right">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">Order Date</p>
                <p className="text-sm font-medium">{new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>

            {/* Tracking Pipeline */}
            <div className="mb-12 relative">
              <div className="absolute top-6 left-0 right-0 h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-1000 ease-out"
                  style={{ width: `${(getStatusIndex(order.status) / (statuses.length - 1)) * 100}%` }}
                />
              </div>

              <div className="relative flex justify-between z-10">
                {statuses.map((status, index) => {
                  const isActive = getStatusIndex(order.status) >= index;
                  const Icon = status.icon;
                  return (
                    <div key={status.id} className="flex flex-col items-center gap-3">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500",
                        isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground border-2 border-background"
                      )}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={cn(
                        "text-xs md:text-sm font-bold uppercase tracking-widest text-center max-w-[80px]",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {status.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Items */}
            <h3 className="text-lg font-bold uppercase tracking-widest mb-6">Order Details</h3>
            <div className="flex flex-col gap-4 mb-8">
              {order.items.map(item => (
                <div key={`${item.id}-${item.variantId}`} className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-background">
                  <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-md bg-secondary" />
                  <div className="flex-1">
                    <p className="text-[10px] text-muted-foreground font-bold tracking-[0.2em] uppercase mb-1">{item.brand}</p>
                    <h4 className="font-bold text-sm line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">Size: {item.size} • Qty: {item.quantity}</p>
                  </div>
                  <div className="font-medium text-sm">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="flex flex-col gap-2 text-sm bg-muted/30 p-6 rounded-2xl">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-primary">
                  <span>Discount ({order.coupon})</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="w-full h-px bg-border my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>

          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

