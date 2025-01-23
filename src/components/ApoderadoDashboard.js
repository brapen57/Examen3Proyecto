import React from "react";
import "./AdminDashboard.css"; // Reutilizamos los estilos del AdminDashboard

const ApoderadoDashboard = ({ apoderado, onNavigateBack, onLogout }) => {
    return (
        <div className="admin-container">
            <h1>Panel del Apoderado</h1>
            <button className="logout-button" onClick={onLogout}>
                Cerrar Sesión
            </button>

            {/* Información del Apoderado */}
            <div className="student-info-section">
                <h2>Información del Apoderado</h2>
                <div className="info-group">
                    <strong>Nombre:</strong> {apoderado.nombre}
                </div>
                <div className="info-group">
                    <strong>Teléfono:</strong> {apoderado.telefono}
                </div>
                <div className="info-group">
                    <strong>Dirección:</strong> {apoderado.direccion}
                </div>
            </div>

            {/* Lista de Estudiantes Asociados */}
            <div className="students-section">
                <h2>Estudiantes Asociados</h2>
                {apoderado.estudiantes.length > 0 ? (
                    <ul>
                        {apoderado.estudiantes.map((estudiante) => (
                            <li key={estudiante.id}>
                                <strong>Nombre:</strong> {estudiante.nombre} |{" "}
                                <strong>Curso:</strong> {estudiante.curso} |{" "}
                                <strong>Estado Matrícula:</strong>{" "}
                                {estudiante.estadoMatricula}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay estudiantes asociados.</p>
                )}
            </div>

            {/* Botón para volver al Panel del Estudiante */}
            <button className="navigate-button" onClick={onNavigateBack}>
                Volver al Panel del Estudiante
            </button>
        </div>
    );
};

export default ApoderadoDashboard;