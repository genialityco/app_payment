import React, { createContext, useContext, useEffect, useState } from "react";
import app from "../../firebase-config.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
  updateProfile,
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

      const userName = localStorage.getItem("userName");
      if (user && user.isAnonymous && userName) {
        user.displayName = userName;
      }

      // Si no hay usuario o el usuario no es un administrador, realiza la autenticación anónima
      // if (!user || (!isAdmin && !user.isAnonymous)) {
      //   handleAnonymousLogin();
      // }
    });

    return unsubscribe;
  }, []);

  const handleAnonymousLogin = async (name) => {
    // Solo intenta autenticar como anónimo si no hay un usuario actual o si el usuario actual no es anónimo
    if (!currentUser || (currentUser && !currentUser.isAnonymous)) {
      try {
        const userCredential = await signInAnonymously(auth);
        setUserAnonymous(userCredential.user);
        await updateProfile(userCredential.user, { displayName: name });
        // Guarda el UID en sessionStorage o localStorage
        localStorage.setItem("userName", name);
        sessionStorage.setItem("userAnonymousUid", userCredential.user.uid);
        console.log("Usuario anónimo:", userCredential.user);
        return userCredential.user; // Devuelve el usuario anónimo para su uso posterior
      } catch (error) {
        console.error("Error al iniciar sesión anónimamente:", error);
      }
    }
    // Si ya existe un usuario anónimo, devuelve ese usuario
    return currentUser;
  };

  const setNameForAnonymousUser = async (name) => {
    const anonymousUser = await handleAnonymousLogin(); // Asegura la autenticación anónima primero

    if (anonymousUser && name && !anonymousUser.displayName) {
      console.log("Estableciendo nombre para usuario anónimo:", name);
      console.log(anonymousUser);
      try {
        await updateProfile(userAnonymous, { displayName: name });
        localStorage.setItem("userName", anonymousUser.displayName);
        console.log("Nombre del usuario anónimo guardado en Firestore");
      } catch (error) {
        console.error(
          "Error al guardar el nombre del usuario anónimo en Firestore:",
          error
        );
      }
    }
  };

  const getAnonymousUserInfo = async () => {
    const userAnonymousUid = sessionStorage.getItem("userAnonymousUid");
    if (userAnonymousUid) {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(
        query(
          collection(db, "anonymousUsers"),
          where("uid", "==", userAnonymousUid)
        )
      );

      let userName = "";
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        userName = doc.data().name;
      });

      console.log("Nombre recuperado del usuario anónimo:", userName);
      return { uid: userAnonymousUid, name: userName };
    }
    return null;
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
    eventData.userId = currentUser
      ? currentUser.user.uid
      : userAnonymous.user.uid;
    try {
      const docRef = await addDoc(collection(db, "dataSessions"), eventData);
      console.log(
        "Información del evento guardada correctamente, ID del documento:",
        docRef.id
      );
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
    handleAnonymousLogin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
