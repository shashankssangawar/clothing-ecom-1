import { useState, useEffect } from "react";
import { getDbInstance } from "@/lib/db";
import { applyCoupon as calculateCoupon } from "@/lib/coupon";

export function useCoupon(cartItems) {
  const [coupons, setCoupons] = useState([]);
  const [activeCoupon, setActiveCoupon] = useState(null);
  const [couponState, setCouponState] = useState({ discount: 0, finalTotal: 0 });

  useEffect(() => {
    async function fetchCoupons() {
      const db = await getDbInstance();
      const allCoupons = await db.getAll("coupons");
      setCoupons(allCoupons);
    }
    fetchCoupons();
  }, []);

  // Recalculate whenever cart or active coupon changes
  useEffect(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    if (!activeCoupon) {
      setCouponState({ discount: 0, finalTotal: subtotal });
      return;
    }

    const result = calculateCoupon(cartItems, activeCoupon, coupons);
    if (result.success) {
      setCouponState({ discount: result.discount, finalTotal: result.finalTotal });
    } else {
      setActiveCoupon(null);
      setCouponState({ discount: 0, finalTotal: subtotal });
    }
  }, [cartItems, activeCoupon, coupons]);

  const applyCouponCode = (code) => {
    const result = calculateCoupon(cartItems, code, coupons);
    if (result.success) {
      setActiveCoupon(code);
      return { success: true, message: result.message };
    }
    return { success: false, message: result.message };
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
  };

  return { coupons, activeCoupon, applyCouponCode, removeCoupon, ...couponState };
}
