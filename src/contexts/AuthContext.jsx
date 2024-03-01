import React, { createContext, useContext, useEffect, useState } from "react";
import app from "../../firebase-config.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDoc } from "firebase/firestore";
const auth = getAuth(app);

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userAnonymous, setUserAnonymous] = useState(null);
  const [isAdministrator, setIsAdministrator] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      const isAdmin = user?.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsAdministrator(isAdmin);

      // Si no hay usuario o el usuario no es un administrador, realiza la autenticación anónima
      if (!user || !isAdmin) {
        handleAnonymousLogin();
      }
    });

    return unsubscribe;
  }, []);

  const handleAnonymousLogin = async () => {
    try {
      const userAnonymous = await signInAnonymously(auth);
      setUserAnonymous(userAnonymous);
      console.log(userAnonymous);
    } catch (error) {
      console.error("Error al iniciar sesión anónimamente:", error);
    }
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    // Después de cerrar sesión, intenta autenticar al usuario de forma anónima nuevamente
    handleAnonymousLogin();
  };

  const saveEventData = async (eventData) => {
    const db = getFirestore(app);
    eventData.userId = currentUser ? currentUser.user.uid : userAnonymous.user.uid;
    try {
      const docRef = await addDoc(collection(db, "dataSessions"), eventData);
      console.log("Información del evento guardada correctamente, ID del documento:", docRef.id);
    } catch (error) {
      console.error("Error al guardar la información del evento:", error);
    }
  };

  const value = {
    currentUser,
    isAdministrator,
    login,
    logout,
    saveEventData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
