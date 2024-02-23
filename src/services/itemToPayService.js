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

const getItemToPayById = async (idItem) => {
  try {
    const response = await apiItemToPayment.get(`/getitem/${idItem}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el pago:", error);
    throw error;
  }
};

const updateItemToPay = async (itemId, itemData) => {
  try {
    const response = await apiItemToPayment.put(`/updateitem/${itemId}`, {
      data: itemData,
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el item de pago:", error);
    throw error;
  }
};

const deleteItemToPay = async (itemId) => {
  try {
    const response = await apiItemToPayment.delete(`/deleteitem/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el item de pago:", error);
    throw error;
  }
};

export { createItemToPay, getItemsToPay, getItemToPayById, updateItemToPay, deleteItemToPay };
