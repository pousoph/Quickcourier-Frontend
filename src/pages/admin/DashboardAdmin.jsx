import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import { LogOut, Users, ClipboardList } from "lucide-react";

export const DashboardAdmin = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
            navigate("/login");
            return;
        }
        setUser(storedUser);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2>QuickCourier</h2>
                <div className="sidebar-user">
                    <Users />
                    <span>{user?.nombre || "Administrador"}</span>
                </div>
                <nav>
                    <button className="nav-btn active"><ClipboardList /> Gestión de usuarios</button>
                    <button className="nav-btn">Reportes</button>
                    <button className="nav-btn logout" onClick={handleLogout}>
                        <LogOut /> Cerrar sesión
                    </button>
                </nav>
            </aside>

            <main className="dashboard-main">
                <header>
                    <h1>Panel de Administración</h1>
                    <p>Bienvenido, {user?.nombre || "Admin"} 👋</p>
                </header>

                <section className="content-box">
                    <h3>Resumen general</h3>
                    <p>Supervisa el rendimiento y gestiona usuarios del sistema.</p>
                    <div className="cards-grid">
                        <div className="card">
                            <Users className="card-icon" />
                            <h4>Usuarios activos</h4>
                            <p>245 registrados</p>
                        </div>
                        <div className="card">
                            <ClipboardList className="card-icon" />
                            <h4>Pedidos del día</h4>
                            <p>52 entregas completadas</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};
