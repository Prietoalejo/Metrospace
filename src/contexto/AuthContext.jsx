import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, signInWithGoogle } from '../firebase';
import { getUsuarioByCorreo, upsertUsuario } from '../logica/supabaseUsuario';
import { signOut } from 'firebase/auth';



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
      setCurrentUser(user || null);
      if (user) {
        // Buscar usuario en Supabase por correo
        try {
          let usuario = null;
          try {
            usuario = await getUsuarioByCorreo(user.email);
          } catch (e) {
            // Si no existe, lo creamos con los datos de Firebase
            usuario = await upsertUsuario({
              nombre: user.displayName || '',
              apellido: '',
              cedula: '',
              correo: user.email,
              telefono: '',
              contrasena: null,
              rol: 'usuario'
            });
            // Si upsertUsuario retorna array, toma el primer elemento
            if (Array.isArray(usuario)) usuario = usuario[0];
          }
          setProfile(usuario);
        } catch (e) {
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
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





