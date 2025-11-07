import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, XCircle, ArrowRight, Home } from "lucide-react";
import "../../styles/orderConfirmation.css";

const OrderConfirmationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const order = location.state?.order;

    if (!order) {
        return (
            <div className="order-confirmation-empty">
                <p>No se encontró información del pedido.</p>
                <button className="btn-primary" onClick={() => navigate("/customer/dashboard")}>
                    Volver al inicio
                </button>
            </div>
        );
    }

    const isConfirmed = order.status === "CONFIRMED";
    const isCancelled = order.status === "CANCELLED";

    return (
        <div className="order-confirmation-container fade-in">
            <div className="order-confirmation-card">
                <div className="status-icon">
                    {isConfirmed ? (
                        <CheckCircle size={72} color="#7b2cbf" />
                    ) : isCancelled ? (
                        <XCircle size={72} color="#d32f2f" />
                    ) : (
                        <ArrowRight size={72} color="#888" />
                    )}
                </div>

                <h2>
                    {isConfirmed
                        ? "¡Pedido confirmado!"
                        : isCancelled
                            ? "Pedido cancelado"
                            : "Pedido creado"}
                </h2>

                <p className="order-message">
                    {isConfirmed
                        ? "Tu pedido ha sido confirmado con éxito. Ahora puedes proceder al pago para completar tu compra."
                        : isCancelled
                            ? "Tu pedido ha sido cancelado. Si fue un error, puedes crear uno nuevo fácilmente."
                            : "Tu pedido ha sido creado. Confírmalo cuando estés listo para continuar."}
                </p>

                <div className="order-summary">
                    <p><strong>Número de pedido:</strong> {order.orderNumber}</p>
                    <p><strong>Total:</strong> ${Number(order.totalAmount).toLocaleString()}</p>
                    <p><strong>Estado:</strong> {order.status}</p>
                </div>

                <div className="order-actions">
                    {isConfirmed && (
                        <button
                            className="btn-primary"
                            onClick={() => navigate("/customer/payment", { state: { order } })}
                        >
                            Proceder al pago
                        </button>
                    )}

                    <button
                        className="btn-secondary"
                        onClick={() => navigate("/customer/dashboard")}
                    >
                        <Home size={18} />
                        <span>Volver al inicio</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
