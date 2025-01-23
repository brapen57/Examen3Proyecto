import { db } from "../components/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

const apoderadosCollection = collection(db, "apoderados");

export const getApoderados = async () => {
    const snapshot = await getDocs(apoderadosCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addApoderado = async (apoderado) => {
    const docRef = await addDoc(apoderadosCollection, apoderado);
    return { id: docRef.id, ...apoderado };
};