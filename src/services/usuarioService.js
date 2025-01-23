import { db } from "../components/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

const usuariosCollection = collection(db, "usuarios");

export const getUsuarios = async () => {
    const snapshot = await getDocs(usuariosCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addUsuario = async (usuario) => {
    const docRef = await addDoc(usuariosCollection, usuario);
    return { id: docRef.id, ...usuario };
};