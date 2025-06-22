// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; 
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyAvykCXXNLjht_fNTaJVMQcMCDgpE97HQ8",
  authDomain: "metrospace-496d5.firebaseapp.com",
  projectId: "metrospace-496d5",
  storageBucket: "metrospace-496d5.firebasestorage.app",
  messagingSenderId: "41930662233",
  appId: "1:41930662233:web:e06edce0fca6d2ec74ec48"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 
export const db = getFirestore(app); 

export default app;