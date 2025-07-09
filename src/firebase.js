import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup 
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAESyF5ZXdqQU5pWmrL6eqtyhlMinSd_9M",
    authDomain: "metrospace2-0.firebaseapp.com",
    projectId: "metrospace2-0",
    storageBucket: "metrospace2-0.firebasestorage.app",
    messagingSenderId: "366162115445",
    appId: "1:366162115445:web:2099778da9a678afb7b13c",
    measurementId: "G-6RY1TGB4FL"
};


export const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();



export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error) {
        if (error.code === 'auth/popup-closed-by-user') {
            return null;
        }
        throw error;
    }
};


export { auth };