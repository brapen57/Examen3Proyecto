import { db } from "../components/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

const matriculasCollection = collection(db, "matriculas");

export const getMatriculas = async () => {
    const snapshot = await getDocs(matriculasCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addMatricula = async (matricula) => {
    const docRef = await addDoc(matriculasCollection, matricula);
    return { id: docRef.id, ...matricula };
};