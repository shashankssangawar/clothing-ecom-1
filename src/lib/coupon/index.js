export function applyCoupon(cartItems, couponCode, activeCoupons) {
  const coupon = activeCoupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase());
  
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (!coupon) {
    return { success: false, message: "Invalid coupon code.", discount: 0, finalTotal: subtotal };
  }

  if (!coupon.isActive) {
    return { success: false, message: "This coupon is no longer active.", discount: 0, finalTotal: subtotal };
  }

  const expiry = new Date(coupon.expiryDate);
  if (expiry < new Date()) {
    return { success: false, message: "Coupon has expired.", discount: 0, finalTotal: subtotal };
  }

  if (subtotal < coupon.minCartValue) {
    return { success: false, message: `Minimum cart value of ₹${coupon.minCartValue} required.`, discount: 0, finalTotal: subtotal };
  }

  let discountAmount = 0;
  if (coupon.type === "percentage") {
    discountAmount = (subtotal * coupon.value) / 100;
  } else if (coupon.type === "flat") {
    discountAmount = coupon.value;
  }

  if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
    discountAmount = coupon.maxDiscount;
  }

  return {
    success: true,
    message: `Coupon applied successfully!`,
    discount: discountAmount,
    finalTotal: subtotal - discountAmount,
    couponCode: coupon.code
  };
}
