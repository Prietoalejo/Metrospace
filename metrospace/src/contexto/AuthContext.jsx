import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from "firebase/firestore";


const AuthContext = createContext();


export function useAuth() {
  return useContext(AuthContext);
}


export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Obtener datos adicionales de Firestore
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "usuarios", user.uid));
       
        setCurrentUser({
          ...user,
          userData: userDoc.exists() ? userDoc.data() : null
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });


    return unsubscribe;
  }, []);


  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  const value = {
    currentUser,
    loading,
    logout,
    db,
  };


  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}





