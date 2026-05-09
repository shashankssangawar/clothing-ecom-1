import { useState, useEffect } from "react";
import { getDbInstance } from "@/lib/db";
import { toast } from "sonner";

export function useCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    const db = await getDbInstance();
    const items = await db.getAll("cart");
    setCartItems(items);
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product, variant, quantity = 1) => {
    const db = await getDbInstance();
    const cartId = `${product.id}-${variant.id}`;
    
    const existing = await db.get("cart", cartId);
    if (existing) {
      if (existing.quantity + quantity > variant.stock) {
        toast.error("Not enough stock available");
        return;
      }
      existing.quantity += quantity;
      await db.put("cart", existing);
    } else {
      await db.put("cart", {
        id: cartId,
        productId: product.id,
        variantId: variant.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.images[0],
        size: variant.size,
        color: variant.color,
        quantity,
      });
    }
    toast.success("Added to cart");
    fetchCart();
  };

  const removeFromCart = async (cartId) => {
    const db = await getDbInstance();
    await db.delete("cart", cartId);
    toast.info("Removed from cart");
    fetchCart();
  };

  const updateQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    const db = await getDbInstance();
    const existing = await db.get("cart", cartId);
    if (existing) {
      // Need to fetch actual variant stock to validate. For demo, we just update.
      existing.quantity = newQuantity;
      await db.put("cart", existing);
      fetchCart();
    }
  };

  const clearCart = async () => {
    const db = await getDbInstance();
    await db.clear("cart");
    fetchCart();
  };

  const checkout = async (finalTotal, discount, activeCoupon) => {
    const db = await getDbInstance();
    const orderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Validate stock and deduct
    for (const item of cartItems) {
      const product = await db.get("products", item.productId);
      const variantIndex = product.variants.findIndex(v => v.id === item.variantId);
      if (variantIndex !== -1) {
        if (product.variants[variantIndex].stock < item.quantity) {
          toast.error(`Not enough stock for ${item.name}`);
          return { success: false };
        }
        product.variants[variantIndex].stock -= item.quantity;
        await db.put("products", product);
      }
    }

    const order = {
      id: orderId,
      date: new Date().toISOString(),
      items: cartItems,
      subtotal: subtotal,
      discount: discount,
      coupon: activeCoupon,
      total: finalTotal,
      status: "PLACED"
    };

    await db.put("orders", order);
    await clearCart();
    toast.success("Order placed successfully!");
    return { success: true, orderId };
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return { cartItems, loading, addToCart, removeFromCart, updateQuantity, clearCart, checkout, subtotal };
}
