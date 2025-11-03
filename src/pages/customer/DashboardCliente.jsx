import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import { LogOut, User, Package } from "lucide-react";

export const DashboardCliente = () => {
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
                    <User />
                    <span>{user?.nombre || "Cliente"}</span>
                </div>
                <nav>
                    <button className="nav-btn active"><Package /> Mis envíos</button>
                    <button className="nav-btn">Configuración</button>
                    <button className="nav-btn logout" onClick={handleLogout}>
                        <LogOut /> Cerrar sesión
                    </button>
                </nav>
            </aside>

            <main className="dashboard-main">
                <header>
                    <h1>Panel del Cliente</h1>
                    <p>Bienvenido, {user?.nombre || "Usuario"} 👋</p>
                </header>

                <section className="content-box">
                    <h3>Tus próximos envíos</h3>
                    <p>Aquí podrás ver tus pedidos y su estado.</p>
                    <div className="cards-grid">
                        <div className="card">
                            <Package className="card-icon" />
                            <h4>Pedido #1234</h4>
                            <p>Estado: En camino 🚚</p>
                        </div>
                        <div className="card">
                            <Package className="card-icon" />
                            <h4>Pedido #1235</h4>
                            <p>Estado: Entregado ✅</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};
