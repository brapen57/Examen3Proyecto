import React, { useEffect, useState } from "react";
import { addEstudiante, getEstudiantes } from "../services/estudianteService";
import ProductItem from "./ProductItem";
import "./ProductList.css"; // Archivo de estilos

const ProductList = ({ onLogout, onViewApoderado, onViewMatricula }) => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [formData, setFormData] = useState({
        nombre: "",
        edad: "",
        curso: "",
        estadoMatricula: "pendiente",
    });
    const [searchFilters, setSearchFilters] = useState({
        nombre: "",
        edad: "",
        curso: "",
        estadoMatricula: "",
    });
    const [errors, setErrors] = useState({});
    const [showResults, setShowResults] = useState(false); // Estado para controlar cuándo mostrar los resultados

    useEffect(() => {
        const fetchEstudiantes = async () => {
            try {
                const data = await getEstudiantes();
                setStudents(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error al obtener estudiantes:", error);
            }
        };
        fetchEstudiantes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setSearchFilters({ ...searchFilters, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const estudiante = {
                nombre: formData.nombre.trim(),
                edad: parseInt(formData.edad),
                curso: formData.curso.trim(),
                estadoMatricula: formData.estadoMatricula.trim(),
            };

            await addEstudiante(estudiante);
            setFormData({ nombre: "", edad: "", curso: "", estadoMatricula: "pendiente" });
            setErrors({});
            alert("Estudiante agregado exitosamente.");
        } catch (error) {
            console.error("Error al guardar el estudiante:", error);
            alert("No se pudo guardar el estudiante. Intente nuevamente más tarde.");
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio.";
        if (!formData.edad || isNaN(formData.edad)) newErrors.edad = "La edad es obligatoria y debe ser un número.";
        if (!formData.curso) newErrors.curso = "El curso es obligatorio.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSearch = () => {
        const { nombre, edad, curso, estadoMatricula } = searchFilters;

        const filtered = students.filter((student) => {
            const matchesNombre = nombre ? student.nombre.toLowerCase().includes(nombre.toLowerCase()) : true;
            const matchesEdad = edad ? student.edad === parseInt(edad) : true;
            const matchesCurso = curso ? student.curso.toLowerCase().includes(curso.toLowerCase()) : true;
            const matchesEstadoMatricula = estadoMatricula
                ? student.estadoMatricula.toLowerCase().includes(estadoMatricula.toLowerCase())
                : true;

            return matchesNombre && matchesEdad && matchesCurso && matchesEstadoMatricula;
        });

        setFilteredStudents(filtered);
        setShowResults(true); // Muestra los resultados solo después de la consulta
    };

    return (
        <div className="productlist-container">
            <div className="header">
                <h1>Gestión de Estudiantes</h1>
                <button
                    className="btn btn-secondary"
                    onClick={onLogout}
                >
                    Cerrar Sesión
                </button>
            </div>

            {/* Sección para agregar estudiantes */}
            <form onSubmit={handleSubmit} className="card p-4 shadow mb-5 add-student-section">
                <h2 className="text-center mb-4">Agregar Estudiante</h2>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                    {errors.nombre && <p className="text-danger mt-1">{errors.nombre}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="edad" className="form-label">Edad:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="edad"
                        name="edad"
                        value={formData.edad}
                        onChange={handleChange}
                    />
                    {errors.edad && <p className="text-danger mt-1">{errors.edad}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="curso" className="form-label">Curso:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="curso"
                        name="curso"
                        value={formData.curso}
                        onChange={handleChange}
                    />
                    {errors.curso && <p className="text-danger mt-1">{errors.curso}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="estadoMatricula" className="form-label">Estado Matrícula:</label>
                    <select
                        className="form-control"
                        id="estadoMatricula"
                        name="estadoMatricula"
                        value={formData.estadoMatricula}
                        onChange={handleChange}
                    >
                        <option value="pendiente">Pendiente</option>
                        <option value="completa">Completa</option>
                        <option value="incompleta">Incompleta</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">Agregar Estudiante</button>
            </form>

            {/* Sección de filtros */}
            <div className="card p-3 shadow mb-4 filter-section">
                <h4 className="text-center mb-3">Filtrar Estudiantes</h4>
                <div className="row g-2">
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            name="nombre"
                            value={searchFilters.nombre}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Edad"
                            name="edad"
                            value={searchFilters.edad}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Curso"
                            name="curso"
                            value={searchFilters.curso}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <select
                            className="form-control"
                            name="estadoMatricula"
                            value={searchFilters.estadoMatricula}
                            onChange={handleFilterChange}
                        >
                            <option value="">Estado</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="completa">Completa</option>
                            <option value="incompleta">Incompleta</option>
                        </select>
                    </div>
                </div>
                <button className="btn btn-secondary w-100 mt-3" onClick={handleSearch}>Buscar</button>
            </div>

            {/* Resultados solo después de la búsqueda */}
            {showResults && (
                <>
                    <h2 className="text-center mt-5">Resultados de la Búsqueda</h2>
                    <ul className="list-group mt-3">
                        {filteredStudents.map((student) => (
                            <ProductItem
                                key={student._id}
                                product={student}
                                onViewApoderado={(id) => console.log(`Ver Apoderado para el estudiante con ID: ${id}`)}
                                onViewMatricula={(id) => console.log(`Ver Matrícula para el estudiante con ID: ${id}`)}
                            />
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default ProductList;