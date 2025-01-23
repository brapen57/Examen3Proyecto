import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4ILMwYM6kWQYqzj2swfcGfXzDpu6rTgw",
  authDomain: "peliculas-8ed9a.firebaseapp.com",
  projectId: "peliculas-8ed9a",
  storageBucket: "peliculas-8ed9a.firebasestorage.app",
  messagingSenderId: "933272402210",
  appId: "1:933272402210:web:1751cf1de4b38dce9e0d7b",
  measurementId: "G-F3F6RS788C"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);


console.log("Firestore conectado correctamente.");
