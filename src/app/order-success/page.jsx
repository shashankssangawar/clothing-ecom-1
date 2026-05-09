"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-24 pb-24 container mx-auto px-4">
        <div className="max-w-md w-full flex flex-col items-center text-center p-8 rounded-3xl border border-border bg-card">
          <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Order Confirmed</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for shopping with LUMEN. Your order has been placed successfully and is being processed.
          </p>
          
          {orderId && (
            <div className="bg-muted w-full py-3 rounded-lg mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Order Number</p>
              <p className="text-lg font-mono font-bold mt-1">{orderId}</p>
            </div>
          )}

          <div className="flex flex-col gap-3 w-full">
            <Button asChild className="w-full h-14 rounded-xl text-sm font-bold tracking-widest uppercase">
              <Link href={`/track?id=${orderId || ""}`}>Track Order</Link>
            </Button>
            <Button asChild variant="outline" className="w-full h-14 rounded-xl text-sm font-bold tracking-widest uppercase bg-transparent">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
