import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

const createAxiosInstance = (baseURL) => {
  const api = axios.create({
    baseURL,
  });

  return api;
};

const apiCoupon = createAxiosInstance(`${API_BASE_URL}/coupon`);

const apiItemToPayment = createAxiosInstance(`${API_BASE_URL}/item`);

const apiPaymentsDb = createAxiosInstance(`${API_BASE_URL}/paymentdb`);

const apiDlocalGo = createAxiosInstance(`${API_BASE_URL}/dlocalgo`);

export { apiCoupon, apiItemToPayment, apiPaymentsDb, apiDlocalGo };
