"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { ShoppingBag, Menu, X, Hexagon } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { cartItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "glass shadow-sm border-white/10" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Hexagon className="h-8 w-8 text-primary transition-transform group-hover:rotate-90 duration-500" />
          <span className="font-bold text-2xl tracking-tighter uppercase">Lumen</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
          <Link href="/products" className="hover:text-primary/70 transition-colors">Shop</Link>
          <Link href="/products?category=men" className="hover:text-primary/70 transition-colors">Men</Link>
          <Link href="/products?category=women" className="hover:text-primary/70 transition-colors">Women</Link>
          <Link href="/track" className="hover:text-primary/70 transition-colors">Track Order</Link>
          <Link href="/admin" className="hover:text-primary/70 transition-colors">Admin</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2 hover:bg-primary/10 rounded-full transition-colors group">
            <ShoppingBag className="h-6 w-6 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 h-5 w-5 bg-foreground text-background flex items-center justify-center rounded-full text-xs font-bold animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </Link>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-4 animate-in slide-in-from-top-4">
          <Link href="/products" className="font-medium p-2" onClick={() => setIsMobileMenuOpen(false)}>Shop All</Link>
          <Link href="/products?category=men" className="font-medium p-2" onClick={() => setIsMobileMenuOpen(false)}>Men</Link>
          <Link href="/products?category=women" className="font-medium p-2" onClick={() => setIsMobileMenuOpen(false)}>Women</Link>
          <Link href="/admin" className="font-medium p-2" onClick={() => setIsMobileMenuOpen(false)}>Admin</Link>
        </div>
      )}
    </header>
  );
}
