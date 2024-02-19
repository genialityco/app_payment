import { apiPaymentsDb } from "./index.js";

const createPaymentDb = async (paymentData) => {
  try {
    const response = await apiPaymentsDb.post(`/createpaymentdb`, {
      data: paymentData,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el pago:", error);
    throw error;
  }
};

const getPayments = async () => {
  try {
    const response = await apiPaymentsDb.get(`/getpaymentsdb`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los pagos:", error);
    throw error;
  }
};

const getPaymentByOrderId = async (orderId) => {
  try {
    const response = await apiPaymentsDb.get(`/getpaymentdb/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el pago:", error);
    throw error;
  }
};

const getPaymentsByPayerDocument = async (payerDocument) => {
  try {
    const response = await apiPaymentsDb.get(`/getpaymentsdb/${payerDocument}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el pago:", error);
    throw error;
  }
};

export {
  createPaymentDb,
  getPayments,
  getPaymentByOrderId,
  getPaymentsByPayerDocument,
};
