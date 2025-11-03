import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import { registerUser } from "../services/authService";
import { UserPlus, Mail, Lock, Phone, User } from "lucide-react";
import logo from "../assets/QuickCourierLogo.png";

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
    });
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
            const response = await registerUser(form);
            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("refreshToken", response.refreshToken);
            localStorage.setItem("user", JSON.stringify(response.user));

            navigate("/customer/dashboard");
        } catch (err) {
            setError(err.message || "Error al crear la cuenta");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-logo">
                    <img src={logo} alt="QuickCourier" />
                    <h2>QuickCourier</h2>
                </div>

                <h3>Crear cuenta</h3>
                <p className="register-subtitle">
                    Completa tus datos para registrarte como cliente
                </p>

                <form onSubmit={handleSubmit} className="register-form">
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
                            minLength={6}
                        />
                    </div>

                    <div className="input-group">
                        <User className="input-icon" />
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Nombre"
                            value={form.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <User className="input-icon" />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Apellido"
                            value={form.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <Phone className="input-icon" />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Teléfono (10 dígitos)"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            pattern="[0-9]{10}"
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="btn-register" disabled={loading}>
                        {loading ? "Creando..." : <>Crear cuenta <UserPlus size={18} /></>}
                    </button>
                </form>

                <p className="login-text">
                    ¿Ya tienes una cuenta?{" "}
                    <span onClick={() => navigate("/login")}>Inicia sesión aquí</span>
                </p>
            </div>
        </div>
    );
};
