import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../components/firebaseConfig";
import "./LoginScreen.css";
import { addDoc } from "firebase/firestore";

const LoginScreen = ({ onLogin }) => {
    const [formData, setFormData] = useState({ email: "", password: "", profile: "" });
    const [registerMode, setRegisterMode] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = "El correo es obligatorio.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Ingrese un correo válido.";
        }

        if (!registerMode && !formData.password) {
            newErrors.password = "La contraseña es obligatoria.";
        }

        if (!formData.profile) {
            newErrors.profile = "Debe seleccionar un perfil.";
        }

        if (registerMode) {
            if (formData.password.length < 8) {
                newErrors.password = "La contraseña debe tener al menos 8 caracteres.";
            }
            if (formData.password !== confirmPassword) {
                newErrors.confirmPassword = "Las contraseñas no coinciden.";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            if (registerMode) {
                // Registro de usuario
                const userRef = collection(db, "users");
                await addDoc(userRef, {
                    email: formData.email,
                    password: formData.password, // Almacena la contraseña para fines de demostración
                    profile: formData.profile,
                    createdAt: new Date(),
                });
                alert("Usuario registrado correctamente.");
                setRegisterMode(false); // Cambiar al modo de inicio de sesión
            } else {
                // Inicio de sesión
                const userRef = collection(db, "users");
                const q = query(userRef, where("email", "==", formData.email));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    setErrors({ email: "El correo no está registrado." });
                    setLoading(false);
                    return;
                }

                const user = querySnapshot.docs[0].data();
                if (user.password !== formData.password) {
                    setErrors({ password: "La contraseña es incorrecta." });
                    setLoading(false);
                    return;
                }

                if (user.profile.trim().toLowerCase() !== formData.profile.trim().toLowerCase()) {
                    setErrors({ profile: "El perfil seleccionado no coincide con el usuario." });
                    setLoading(false);
                    return;
                }

                onLogin(user.profile); // Pasa el perfil del usuario al componente principal
            }
        } catch (error) {
            console.error("Error durante el inicio de sesión:", error);
            alert("Ocurrió un error. Intente nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">{registerMode ? "Registrarse" : "Inicio de Sesión"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="error-text">{errors.password}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="profile">Seleccionar Perfil:</label>
                        <select
                            id="profile"
                            name="profile"
                            value={formData.profile}
                            onChange={handleChange}
                        >
                            <option value="">Seleccione un perfil</option>
                            <option value="Administrador">Administrador</option>
                            <option value="Apoderado">Apoderado</option>
                            <option value="Estudiante">Estudiante</option>
                        </select>
                        {errors.profile && <p className="error-text">{errors.profile}</p>}
                    </div>
                    {registerMode && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? "Cargando..." : registerMode ? "Registrarse" : "Iniciar Sesión"}
                    </button>
                </form>
                <div className="toggle-link">
                    {registerMode ? (
                        <p>
                            ¿Ya tienes una cuenta?{" "}
                            <span onClick={() => setRegisterMode(false)}>Inicia sesión aquí.</span>
                        </p>
                    ) : (
                        <p>
                            ¿No tienes una cuenta?{" "}
                            <span onClick={() => setRegisterMode(true)}>Regístrate aquí.</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;