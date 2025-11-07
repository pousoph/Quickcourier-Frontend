import React, { useEffect, useState } from "react";
import "../../styles/profileCliente.css";
import { useNavigate } from "react-router-dom";
import { User, MapPin, LogOut } from "lucide-react";
import { getUserAddresses } from "../../services/customer/addressService.js";

const ProfileCliente = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("accessToken");
        if (!storedUser || !token) {
            navigate("/login");
            return;
        }
        setUser(storedUser);

        const fetchAddresses = async () => {
            try {
                const data = await getUserAddresses(token);
                setAddresses(data);
            } catch (error) {
                console.error("Error al cargar direcciones:", error);
            }
        };
        fetchAddresses();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="profile-container">
            <header className="profile-header">
                <div className="profile-avatar">
                    <div className="avatar-circle">
                        {user?.firstName?.[0]}
                        {user?.lastName?.[0]}
                    </div>
                    <div>
                        <h2>{user?.firstName} {user?.lastName}</h2>
                        <p>{user?.email}</p>
                    </div>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={18} /> Cerrar sesión
                </button>
            </header>

            <div className="profile-grid">
                {/* TU INFORMACIÓN */}
                <div className="profile-card">
                    <div className="profile-card-header">
                        <User size={22} />
                        <h4>Tu información</h4>
                    </div>
                    <p className="profile-card-subtitle">
                        Nombre y datos para identificarte.
                    </p>
                    <div className="profile-info">
                        <p><strong>Nombre:</strong> {user?.firstName}</p>
                        <p><strong>Apellido:</strong> {user?.lastName}</p>
                        <p><strong>Correo:</strong> {user?.email}</p>
                        <p><strong>Telefono:</strong> {user?.phone}</p>
                    </div>
                </div>

                {/* DIRECCIONES */}
                <div className="profile-card">
                    <div className="profile-card-header">
                        <MapPin size={22} />
                        <h4>Direcciones</h4>
                    </div>
                    <p className="profile-card-subtitle">
                        Direcciones guardadas en tu cuenta.
                    </p>
                    {addresses.length > 0 ? (
                        <div className="address-list">
                            {addresses.map((addr) => (
                                <div key={addr.id} className="address-item">
                                    <p><strong>{addr.addressLine1}</strong></p>
                                    <p>{addr.city}, {addr.zone}</p>
                                    <p>{addr.addressLine2}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="empty-text">No tienes direcciones guardadas.</p>
                    )}
                    <button
                        className="btn-primary"
                        onClick={() => navigate("/customer/addresses")}
                    >
                        Administrar direcciones
                    </button>
                </div>
                <div className="profile-card" onClick={() => navigate("/customer/orders")}>
                    <h3>Historial de pedidos</h3>
                    <p>Consulta tus pedidos realizados, estados y totales.</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileCliente;
