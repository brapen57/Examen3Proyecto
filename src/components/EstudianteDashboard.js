import React from "react";
import "./EstudianteDashboard.css"; // Reutilizamos los estilos del AdminDashboard

const EstudianteDashboard = ({ estudiante, onNavigateToApoderado, onNavigateToMatricula, onLogout }) => {
    return (
        <div className="admin-container">
            <h1>Panel del Estudiante</h1>
            <button className="logout-button" onClick={onLogout}>
                Cerrar Sesión
            </button>

            {/* Información del Estudiante */}
            <div className="student-info-section">
                <h2>Información del Estudiante</h2>
                <div className="info-group">
                    <strong>Nombre:</strong> {estudiante.nombre}
                </div>
                <div className="info-group">
                    <strong>Edad:</strong> {estudiante.edad}
                </div>
                <div className="info-group">
                    <strong>Curso:</strong> {estudiante.curso}
                </div>
                <div className="info-group">
                    <strong>Estado Matrícula:</strong> {estudiante.estadoMatricula}
                </div>
            </div>

            {/* Botones para navegar a Apoderado y Matrícula */}
            <div className="navigation-section">
                <button
                    className="navigate-button"
                    onClick={onNavigateToApoderado}
                >
                    Ver Información del Apoderado
                </button>
                <button
                    className="navigate-button"
                    onClick={onNavigateToMatricula}
                >
                    Ver Información de Matrícula
                </button>
            </div>
        </div>
    );
};

export default EstudianteDashboard;