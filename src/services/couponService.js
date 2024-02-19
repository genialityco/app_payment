import { apiCoupon } from "./index.js";

const createCoupon = async (couponData) => {
  try {
    const response = await apiCoupon.post(`/createcoupon`, {
      data: couponData,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el cupón:", error);
    throw error;
  }
};

const getCoupons = async () => {
  try {
    const response = await apiCoupon.get(`/getcoupons`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los cupones:", error);
    throw error;
  }
};

const getCouponById = async (couponId) => {
  try {
    const response = await apiCoupon.get(`/getcoupon/${couponId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cupón:", error);
    throw error;
  }
};

const updateCoupon = async (couponId, couponData) => {
  try {
    const response = await apiCoupon.put(`/updatecoupon/${couponId}`, {
      data: couponData,
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el cupón:", error);
    throw error;
  }
};

const deleteCoupon = async (couponId) => {
  try {
    const response = await apiCoupon.delete(`/deletecoupon/${couponId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el cupón:", error);
    throw error;
  }
};

export { createCoupon, getCoupons, getCouponById, updateCoupon, deleteCoupon };
