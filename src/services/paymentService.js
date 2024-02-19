import { apiDlocalGo } from "./index.js";

const createPayment = async (paymentData) => {
  try {
    const response = await apiDlocalGo.post(`/createpayment`, {
      data: paymentData,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el pago:", error);
    throw error;
  }
};

const getPayment = async (paymentId) => {
  try {
    const response = await apiDlocalGo.get(`/getpayment/${paymentId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el pago:", error);
    throw error;
  }
};

export { createPayment, getPayment };
