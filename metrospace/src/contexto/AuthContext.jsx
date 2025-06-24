import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { signInWithGoogle } from '../firebase';


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
        // Obtener datos adicionales de Firestore
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "usuarios", user.uid));
        const userData = userDoc.exists() ? userDoc.data() : null;
       
        setCurrentUser({
          ...user,
          userData: userDoc.exists() ? userDoc.data() : null
        });
        setProfile(userData);
      } else {
        setCurrentUser(null);
        setProfile(null);
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





