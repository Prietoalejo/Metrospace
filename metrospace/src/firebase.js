import {initializeApp} from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";

import{getFirestore} from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAvykCXXNLjht_fNTaJVMQcMCDgpE97HQ8",
    authDomain: "metrospace-496d5.firebaseapp.com",
    projectId: "metrospace-496d5",
    storageBucket: "metrospace-496d5.firebasestorage.app",
    messagingSenderId: "41930662233",
    appId: "1:41930662233:web:e06edce0fca6d2ec74ec48",
    measurementId: "G-CYB0WV6R57"
  };
  
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  const googleProvider = new GoogleAuthProvider();
  // Función para login con Google
export const signInWithGoogle = async () => {
    try {
      const auth = getAuth();
      const result = await signInWithPopup(auth, googleProvider);
      return result.user; // Devuelve el usuario autenticado
    } catch (error) {
      console.error("Error en Google Sign-In:", error);
      throw error;
    }
  };
  
  
  
  
  // Obtener servicios
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  
  export { auth, db };
  export default app;
  
  