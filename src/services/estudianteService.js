import { db } from "../components/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

const estudiantesCollection = collection(db, "estudiantes");

export const getEstudiantes = async () => {
    try {
        const snapshot = await getDocs(estudiantesCollection);
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Error al obtener estudiantes:", error);
        throw error;
    }
};

export const addEstudiante = async (estudiante) => {
    try {
        console.log("Intentando guardar estudiante:", estudiante);
        const docRef = await addDoc(estudiantesCollection, estudiante);
        console.log("Estudiante guardado con ID:", docRef.id);
        return { id: docRef.id, ...estudiante };
    } catch (error) {
        console.error("Error al guardar estudiante:", error);
        throw error;
    }
};
