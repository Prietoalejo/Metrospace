import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAvykCXXNLjht_fNTaJVMQcMCDgpE97HQ8", // Considera usar variables de entorno para esto
    authDomain: "metrospace-496d5.firebaseapp.com",
    projectId: "metrospace-496d5",
    storageBucket: "metrospace-496d5.appspot.com", // Corregido el dominio a .appspot.com que es lo común
    messagingSenderId: "41930662233",
    appId: "1:41930662233:web:e06edce0fca6d2ec74ec48",
    measurementId: "G-CYB0WV6R57"
};

// 1. Inicializa Firebase UNA SOLA VEZ
export const app = initializeApp(firebaseConfig);

// 2. Obtén los servicios de Firebase a partir de la app inicializada
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// 3. Crea y exporta tu función de autenticación
export const signInWithGoogle = async () => {
    try {
        // Usa la instancia 'auth' y 'googleProvider' ya creadas
        const result = await signInWithPopup(auth, googleProvider);
        console.log("Autenticación exitosa:", result.user);
        return result.user; // Devuelve el objeto del usuario
    } catch (error) {
        console.error("Error durante el inicio de sesión con Google:", error);
        
        // Aquí puedes manejar errores específicos
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Código: ${errorCode}, Mensaje: ${errorMessage}`);
        
        // Opcional: Si el usuario cierra el popup, no lo trates como un error fatal
        if (errorCode === 'auth/popup-closed-by-user') {
            return null;
        }

        throw error;
    }
};


// 4. Exporta las instancias de los servicios si las necesitas en otros lugares
export { auth, db };