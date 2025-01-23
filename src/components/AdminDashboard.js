import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import "./AdminDashboard.css";
import { db } from "./firebaseConfig";

const AdminDashboard = ({ onLogout }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        edad: "",
        curso: "",
        estadoMatricula: "Activa", // Valor predeterminado
    });

    const [searchQuery, setSearchQuery] = useState({
        nombre: "",
        edad: "",
        curso: "",
        estadoMatricula: "",
    });

    const [filteredStudents, setFilteredStudents] = useState([]);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchQuery({ ...searchQuery, [name]: value });
    };

    // Función para agregar un estudiante a Firestore
    const handleAddStudent = async (e) => {
        e.preventDefault();
        if (!formData.nombre || !formData.edad || !formData.curso || !formData.estadoMatricula) {
            setErrors({ message: "Todos los campos son obligatorios para agregar un estudiante." });
            return;
        }

        try {
            const studentsRef = collection(db, "estudiantes");
            await addDoc(studentsRef, {
                nombre: formData.nombre,
                edad: parseInt(formData.edad),
                curso: formData.curso,
                estadoMatricula: formData.estadoMatricula,
            });
            alert("Estudiante agregado exitosamente.");
            setFormData({ nombre: "", edad: "", curso: "", estadoMatricula: "Activa" });
        } catch (error) {
            console.error("Error al agregar estudiante:", error);
            alert("Hubo un error al agregar el estudiante. Intente nuevamente.");
        }
    };

    // Función para buscar estudiantes en Firestore
    const handleSearch = async (e) => {
        e.preventDefault();

        const studentsRef = collection(db, "estudiantes");
        const filters = [];
        if (searchQuery.nombre) filters.push(where("nombre", "==", searchQuery.nombre));
        if (searchQuery.edad) filters.push(where("edad", "==", parseInt(searchQuery.edad)));
        if (searchQuery.curso) filters.push(where("curso", "==", searchQuery.curso));
        if (searchQuery.estadoMatricula)
            filters.push(where("estadoMatricula", "==", searchQuery.estadoMatricula));

        try {
            const q = query(studentsRef, ...filters);
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                setFilteredStudents([]);
                alert("No se encontraron estudiantes con esos criterios.");
            } else {
                const students = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setFilteredStudents(students);
            }
        } catch (error) {
            console.error("Error al buscar estudiantes:", error);
            alert("Ocurrió un error durante la búsqueda.");
        }
    };

    return (
        <div className="admin-container">
            <h1>Panel de Administración</h1>
            <button className="logout-button" onClick={onLogout}>
                Cerrar Sesión
            </button>

            {/* Formulario para agregar estudiante */}
            <div className="add-section">
                <h2>Agregar Estudiante</h2>
                <form onSubmit={handleAddStudent}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="edad">Edad:</label>
                        <input
                            type="number"
                            id="edad"
                            name="edad"
                            value={formData.edad}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="curso">Curso:</label>
                        <input
                            type="text"
                            id="curso"
                            name="curso"
                            value={formData.curso}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="estadoMatricula">Estado Matrícula:</label>
                        <select
                            id="estadoMatricula"
                            name="estadoMatricula"
                            value={formData.estadoMatricula}
                            onChange={handleChange}
                            required
                        >
                            <option value="Activa">Activa</option>
                            <option value="Inactiva">Inactiva</option>
                        </select>
                    </div>
                    <button type="submit" className="add-button">
                        Agregar Estudiante
                    </button>
                </form>
            </div>

            {/* Formulario de búsqueda */}
            <div className="search-section">
                <h2>Filtrar Estudiantes</h2>
                <form onSubmit={handleSearch}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={searchQuery.nombre}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="edad">Edad:</label>
                        <input
                            type="number"
                            id="edad"
                            name="edad"
                            value={searchQuery.edad}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="curso">Curso:</label>
                        <input
                            type="text"
                            id="curso"
                            name="curso"
                            value={searchQuery.curso}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="estadoMatricula">Estado Matrícula:</label>
                        <select
                            id="estadoMatricula"
                            name="estadoMatricula"
                            value={searchQuery.estadoMatricula}
                            onChange={handleSearchChange}
                        >
                            <option value="">Seleccione un estado</option>
                            <option value="Activa">Activa</option>
                            <option value="Inactiva">Inactiva</option>
                        </select>
                    </div>
                    <button type="submit" className="search-button">
                        Buscar
                    </button>
                </form>
            </div>

            {/* Resultados de la búsqueda */}
            <div className="results-section">
                <h2>Resultados</h2>
                {filteredStudents.length > 0 ? (
                    <ul>
                        {filteredStudents.map((student) => (
                            <li key={student.id}>
                                <strong>Nombre:</strong> {student.nombre} |{" "}
                                <strong>Edad:</strong> {student.edad} |{" "}
                                <strong>Curso:</strong> {student.curso} |{" "}
                                <strong>Estado Matrícula:</strong> {student.estadoMatricula}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay resultados para mostrar.</p>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;