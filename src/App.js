import React, { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import AdminDashboard from "./components/AdminDashboard";
import ApoderadoDashboard from "./components/ApoderadoDashboard";
import EstudianteDashboard from "./components/EstudianteDashboard";

const App = () => {
    const [userRole, setUserRole] = useState(null); // Estado para almacenar el rol del usuario
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está autenticado
    const [currentView, setCurrentView] = useState("default"); // Estado para manejar la navegación entre vistas

    // Datos simulados del estudiante y apoderado
    const estudianteData = {
        nombre: "Juan Pérez",
        edad: 16,
        curso: "10mo",
        estadoMatricula: "Activa",
    };

    const apoderadoData = {
        nombre: "María López",
        telefono: "123456789",
        direccion: "Calle 123, Ciudad",
        estudiantes: [
            {
                id: "estudiante_1",
                nombre: "Juan Pérez",
                curso: "10mo",
                estadoMatricula: "Activa",
            },
        ],
    };

    // Manejo de inicio de sesión
    const handleLogin = (role) => {
        setUserRole(role); // Asigna el rol del usuario
        setIsLoggedIn(true); // Marca al usuario como autenticado
        setCurrentView("default"); // Restablece la vista predeterminada al iniciar sesión
    };

    // Manejo de cierre de sesión
    const handleLogout = () => {
        setUserRole(null); // Limpia el rol del usuario
        setIsLoggedIn(false); // Marca al usuario como no autenticado
        setCurrentView("default"); // Restablece la vista predeterminada
    };

    // Función para navegar a la información del apoderado
    const handleNavigateToApoderado = () => {
        setCurrentView("apoderado");
    };

    // Función para navegar a la información de la matrícula
    const handleNavigateToMatricula = () => {
        setCurrentView("matricula");
    };

    return (
        <div>
            {isLoggedIn ? (
                <>
                    {userRole === "Administrador" && (
                        <AdminDashboard onLogout={handleLogout} />
                    )}
                    {userRole === "Apoderado" && (
                        <ApoderadoDashboard
                            apoderado={apoderadoData}
                            onLogout={handleLogout}
                            onNavigateBack={() => setCurrentView("default")}
                        />
                    )}
                    {userRole === "Estudiante" && (
                        <>
                            {currentView === "default" && (
                                <EstudianteDashboard
                                    estudiante={estudianteData}
                                    onNavigateToApoderado={handleNavigateToApoderado}
                                    onNavigateToMatricula={handleNavigateToMatricula}
                                    onLogout={handleLogout}
                                />
                            )}
                            {currentView === "apoderado" && (
                                <ApoderadoDashboard
                                    apoderado={apoderadoData}
                                    onLogout={handleLogout}
                                    onNavigateBack={() => setCurrentView("default")}
                                />
                            )}
                            {currentView === "matricula" && (
                                <div className="admin-container">
                                    <h1>Información de Matrícula</h1>
                                    <div className="info-group">
                                        <strong>Nombre:</strong> {estudianteData.nombre}
                                    </div>
                                    <div className="info-group">
                                        <strong>Curso:</strong> {estudianteData.curso}
                                    </div>
                                    <div className="info-group">
                                        <strong>Estado Matrícula:</strong>{" "}
                                        {estudianteData.estadoMatricula}
                                    </div>
                                    <button
                                        className="navigate-button"
                                        onClick={() => setCurrentView("default")}
                                    >
                                        Volver al Panel del Estudiante
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </>
            ) : (
                <LoginScreen onLogin={handleLogin} />
            )}
        </div>
    );
};

export default App;