import { apiItemToPayment } from "./index.js";

const createMembership = async (membership) => {
  try {
    const response = await apiItemToPayment.post(`/createmembership`, {
      data: membership,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el pago:", error);
    throw error;
  }
};

const getMemberships = async () => {
  try {
    const response = await apiItemToPayment.get(`/getmemberships`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el pago:", error);
    throw error;
  }
};

export { createMembership, getMemberships };
