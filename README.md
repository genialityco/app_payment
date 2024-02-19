# Variables de entorno
VITE_APP_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=AIzaSyDpVF9CuAM5OqnOhcQypc-CY_wluAR6KrM

# Configuración firebase archivo firebase-config.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "payment-gateway-10c0e",
  appId: "APP_ID",
};

const app = initializeApp(firebaseConfig);

export default app;
