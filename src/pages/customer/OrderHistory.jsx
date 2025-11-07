import React, { useEffect, useState } from "react";
import { getMyOrders, getOrderById } from "../../services/customer/orderService";
import "../../styles/orderHistory.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const OrderHistory = () => {
    const token = localStorage.getItem("accessToken");
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadOrders(page);
    }, [page]);

    const loadOrders = async (pageNumber = 0) => {
        try {
            setLoading(true);
            const data = await getMyOrders(token, pageNumber, 5);
            setOrders(data.content);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error(err);
            alert("Error al obtener los pedidos.");
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = async (id) => {
        try {
            const data = await getOrderById(token, id);
            setSelectedOrder(data);
        } catch (err) {
            alert("Error al cargar detalles del pedido.");
        }
    };

    const closeDetails = () => setSelectedOrder(null);

    return (
        <div className="order-history-container fade-in">
            <div className="order-header">
                <button className="btn-back" onClick={() => navigate("/customer/profile")}>
                    <ArrowLeft size={18} /> Volver al perfil
                </button>
                <h2>Historial de Pedidos</h2>
            </div>

            {loading ? (
                <p className="loading-text">Cargando tus pedidos...</p>
            ) : orders.length === 0 ? (
                <p className="empty-text">No tienes pedidos registrados.</p>
            ) : (
                <>
                    <table className="order-table">
                        <thead>
                        <tr>
                            <th># Pedido</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((o) => (
                            <tr key={o.id}>
                                <td>{o.orderNumber || `#${o.id}`}</td>
                                <td>{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "—"}</td>
                                <td>
                                    $
                                    {(o.total ?? o.totalAmount ?? 0).toLocaleString()}
                                </td>
                                <td>
                                        <span className={`status ${o.status?.toLowerCase() || "pending"}`}>
                                            {o.status || "Pendiente"}
                                        </span>
                                </td>
                                <td>
                                    <button className="btn-view" onClick={() => handleViewDetails(o.id)}>
                                        Ver detalles
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {/* PAGINACIÓN */}
                    <div className="pagination">
                        <button
                            className="btn-secondary"
                            disabled={page === 0}
                            onClick={() => setPage(page - 1)}
                        >
                            Anterior
                        </button>
                        <span>
                            Página {page + 1} de {totalPages}
                        </span>
                        <button
                            className="btn-secondary"
                            disabled={page + 1 >= totalPages}
                            onClick={() => setPage(page + 1)}
                        >
                            Siguiente
                        </button>
                    </div>
                </>
            )}

            {/* MODAL DETALLES */}
            {selectedOrder && (
                <div className="order-modal">
                    <div className="order-modal-content">
                        <h3>Detalles del pedido</h3>

                        <p>
                            <strong>Número:</strong>{" "}
                            {selectedOrder.orderNumber
                                ? selectedOrder.orderNumber
                                : `#${selectedOrder.id}`}
                        </p>
                        <p><strong>Estado:</strong> {selectedOrder.status || "Desconocido"}</p>
                        <p>
                            <strong>Total:</strong> $
                            {(selectedOrder.total ?? selectedOrder.totalAmount ?? 0).toLocaleString()}
                        </p>
                        <p>
                            <strong>Dirección:</strong>{" "}
                            {selectedOrder.fullAddress
                                ? selectedOrder.fullAddress
                                : selectedOrder.id
                                    ? `Dirección #${selectedOrder.id}`
                                    : "No especificada"}
                        </p>

                        <h4>Productos:</h4>
                        <ul>
                            {selectedOrder.items && selectedOrder.items.length > 0 ? (
                                selectedOrder.items.map((i) => (
                                    <li key={i.id}>
                                        {i.name
                                            ? i.name
                                            : `Producto #${i.id}`}{" "}
                                        x{i.quantity} — $
                                        {(i.unitPrice ?? 0).toLocaleString()}
                                    </li>
                                ))
                            ) : (
                                <li>No hay productos asociados.</li>
                            )}
                        </ul>

                        <button onClick={closeDetails} className="btn-close">
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default OrderHistory;
