import { apiItemToPayment } from "./index.js";

const createItemToPay = async (item) => {
  try {
    const response = await apiItemToPayment.post(`/createitem`, {
      data: item,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el pago:", error);
    throw error;
  }
};

const getItemsToPay = async () => {
  try {
    const response = await apiItemToPayment.get(`/getitems`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el pago:", error);
    throw error;
  }
};

export { createItemToPay, getItemsToPay };
