import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import {
    LogOut,
    Package,
    Tag,
    Truck,
    Users,
    Settings,
    LayoutDashboard,
} from "lucide-react";
import { jwtDecode } from "jwt-decode";
import {ProductList} from "./ProductList.jsx";
import {CategoryList} from "./CategoryList.jsx";
import {ShippingRules} from "./ShippingRules.jsx";
import {UserManagement} from "./UserManagment.jsx";

export const DashboardAdmin = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeSection, setActiveSection] = useState("inicio");

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            navigate("/login");
            return;
        }

        const decoded = jwtDecode(token);
        if (decoded.role !== "ADMIN") {
            alert("Acceso denegado: solo administradores pueden entrar aquí");
            navigate("/login");
            return;
        }

        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const renderContent = () => {
        switch (activeSection) {
            case "productos":
                return (
                    <section className="content-box full-width">
                        <h2>Gestión de productos 📦</h2>
                        <p>Administra tu catálogo, agrega nuevos productos o modifica existentes.</p>
                        <div className="product-section">
                            <ProductList />
                        </div>
                    </section>
                );

            case "categorias":
                return (
                    <section className="content-box">
                        <h2>Gestión de categorías 🏷️</h2>
                        <p>Administra las categorías de tus productos.</p>
                        <div className="cards-grid">
                            <div className="product-section">
                                <CategoryList />
                            </div>
                        </div>
                    </section>
                );

            case "shipping":
                return (
                    <section className="content-box">
                        <div className="cards-grid">
                            <div className="product-section">
                                <ShippingRules />
                            </div>
                        </div>
                    </section>
                );

            case "usuarios":
                return (
                    <section className="content-box">
                        <h2>Gestión de usuarios 👥</h2>
                        <p>Consulta y administra los usuarios registrados.</p>
                        <div className="cards-grid">
                            <div className="product-section">
                                <UserManagement />
                            </div>
                        </div>
                    </section>
                );

            default:
                return (
                    <section className="content-box">
                        <h2>Resumen general del sistema</h2>
                        <p>Selecciona una sección del menú para comenzar o explora las estadísticas principales.</p>

                        <div className="cards-grid">
                            <div
                                className="card clickable"
                                onClick={() => setActiveSection("productos")}
                            >
                                <Package className="card-icon" />
                                <h4>Productos</h4>
                                <p>Gestiona tu inventario, precios y disponibilidad.</p>
                            </div>

                            <div
                                className="card clickable"
                                onClick={() => setActiveSection("usuarios")}
                            >
                                <Users className="card-icon" />
                                <h4>Usuarios</h4>
                                <p>Administra las cuentas y roles registrados.</p>
                            </div>

                            <div
                                className="card clickable"
                                onClick={() => setActiveSection("categorias")}
                            >
                                <Tag className="card-icon" />
                                <h4>Categorías</h4>
                                <p>Organiza tus productos en grupos definidos.</p>
                            </div>

                            <div
                                className="card clickable"
                                onClick={() => setActiveSection("shipping")}
                            >
                                <Truck className="card-icon" />
                                <h4>Reglas de envío</h4>
                                <p>Gestiona zonas, tarifas y tiempos de entrega.</p>
                            </div>
                        </div>
                    </section>
                );
        }
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2>QuickCourier</h2>
                <div className="sidebar-user">
                    <Users />
                    <span>{user?.firstName || "Administrador"}</span>
                </div>

                <nav>
                    <button
                        className={`nav-btn ${activeSection === "inicio" ? "active" : ""}`}
                        onClick={() => setActiveSection("inicio")}
                    >
                        <LayoutDashboard /> Inicio
                    </button>
                    <button
                        className={`nav-btn ${activeSection === "productos" ? "active" : ""}`}
                        onClick={() => setActiveSection("productos")}
                    >
                        <Package /> Productos
                    </button>
                    <button
                        className={`nav-btn ${activeSection === "categorias" ? "active" : ""}`}
                        onClick={() => setActiveSection("categorias")}
                    >
                        <Tag /> Categorías
                    </button>
                    <button
                        className={`nav-btn ${activeSection === "shipping" ? "active" : ""}`}
                        onClick={() => setActiveSection("shipping")}
                    >
                        <Truck /> Shipping
                    </button>
                    <button
                        className={`nav-btn ${activeSection === "usuarios" ? "active" : ""}`}
                        onClick={() => setActiveSection("usuarios")}
                    >
                        <Users /> Usuarios
                    </button>

                    <button className="nav-btn logout" onClick={handleLogout}>
                        <LogOut /> Cerrar sesión
                    </button>
                </nav>
            </aside>

            <main className="dashboard-main">
                <header>
                    <h1>Panel de Administración</h1>
                    <p>Bienvenido, {user?.firstName || "Admin"} 👋</p>
                </header>

                {renderContent()}
            </main>
        </div>
    );
};
