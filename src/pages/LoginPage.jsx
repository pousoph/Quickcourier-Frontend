import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { loginUser } from "../services/authService";
import { Lock, Mail, LogIn } from "lucide-react";
import logo from "../assets/QuickCourierLogo.png";

export const LoginPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await loginUser(form.email, form.password);

            // Guardar tokens y datos del usuario
            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("refreshToken", response.refreshToken);
            localStorage.setItem("user", JSON.stringify(response.user));

            // Redirección por rol
            const userRole = response.user?.role || "CUSTOMER";
            switch (userRole.toUpperCase()) {
                case "ADMIN":
                    navigate("/admin/dashboard");
                    break;
                case "CUSTOMER":
                default:
                    navigate("/customer/dashboard");
                    break;
            }
        } catch (err) {
            setError(err.message || "Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-logo">
                    <img src={logo} alt="QuickCourier" />
                    <h2>QuickCourier</h2>
                </div>

                <h3>Inicia sesión</h3>
                <p className="login-subtitle">
                    Ingresa tus credenciales para continuar
                </p>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <Mail className="input-icon" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <Lock className="input-icon" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="btn-login" disabled={loading}>
                        {loading ? "Ingresando..." : <>Ingresar <LogIn size={18} /></>}
                    </button>
                </form>

                <p className="register-text">
                    ¿No tienes cuenta?{" "}
                    <span onClick={() => navigate("/register")}>Crea una aquí</span>
                </p>
            </div>
        </div>
    );
};
