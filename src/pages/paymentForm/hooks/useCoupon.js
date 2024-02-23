import { useState } from 'react';
import { getCoupons } from "../../../services/couponService";

export const useCoupon = (convertedPrice, setConvertedPrice) => {
  const [coupon, setCoupon] = useState("");
  const [couponId, setCouponId] = useState("");
  const handleChangeCoupon = (e) => {
    setCoupon(e.target.value);
  };

  const applyCoupon = async () => {
    if(couponId != "") return alert("Ya has aplicado un cupón");
    const coupons = await getCoupons();
    const couponData = coupons.data.find((cou) => cou.code === coupon);
    const currentDate = new Date();

    if (couponData && couponData.active && couponData.used < couponData.limit && new Date(couponData.expiration) > currentDate) {
      const newPrice = (convertedPrice - (convertedPrice * couponData.discount) / 100).toFixed(2);
      setCouponId(couponData._id);
      setConvertedPrice(newPrice);
    } else {
      alert("El cupón no es válido o ha vencido.");
    }
  };

  return [coupon, handleChangeCoupon, applyCoupon, couponId];
};
