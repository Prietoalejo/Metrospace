import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { signInWithGoogle } from '../firebase';
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";


const AuthContext = createContext();



export function useAuth() {
  return useContext(AuthContext);
}


export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user) {
      const db = getFirestore();
      const userDocRef = doc(db, "usuarios", user.uid);
      const userDoc = await getDoc(userDocRef);

      // Si el usuario NO existe en Firestore, lo creamos
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          nombre: user.displayName || "",
          apellido: "",
          cedula: "",
          telefono: "",
          categoria: "Estudiante",
          correo: user.email,
          fechaRegistro: new Date()
        });
      }

      // Luego, actualiza el estado como siempre
      const userData = (await getDoc(userDocRef)).data();
      setCurrentUser({
        ...user,
        userData
      });
    } else {
      setCurrentUser(null);
    }
  });
  return () => unsubscribe();
}, []);


  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  const googleLogin = async () => {
  return await signInWithGoogle();
};
  const value = {
    currentUser,
    loading,
    logout,
    db,
    googleLogin,
    profile,     
    setProfile,
    setCurrentUser
    
  };


  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}





