import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Home } from "lucide-react";
import "../../styles/paymentSuccess.css";

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { payment, order } = location.state || {};

    if (!payment) {
        return (
            <div className="payment-empty">
                <p>No se encontró información del pago.</p>
                <button className="btn-primary" onClick={() => navigate("/customer/dashboard")}>
                    Volver al inicio
                </button>
            </div>
        );
    }

    return (
        <div className="payment-success-container fade-in">
            <div className="payment-success-card">
                <CheckCircle size={72} color="#7b2cbf" />
                <h2>¡Pago completado!</h2>
                <p>Tu transacción fue procesada exitosamente.</p>

                <div className="payment-summary">
                    <p><strong>Método:</strong> {payment.paymentMethod}</p>
                    <p><strong>Monto:</strong> ${Number(payment.amount).toLocaleString()}</p>
                    <p><strong>Transacción:</strong> {payment.transactionId}</p>
                </div>

                <div className="payment-actions">
                    <button
                        className="btn-primary"
                        onClick={() => navigate("/customer/orders")}
                    >
                        Ver mis pedidos
                    </button>
                    <button
                        className="btn-secondary"
                        onClick={() => navigate("/customer/dashboard")}
                    >
                        <Home size={18} /> Volver al inicio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
