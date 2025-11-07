import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createPayment, processPayment } from "../../services/customer/paymentService";
import "../../styles/paymentPage.css";
import { CreditCard, Wallet, Smartphone, CheckCircle } from "lucide-react";

const PaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("accessToken");
    const order = location.state?.order;

    const [loading, setLoading] = useState(false);
    const [payment, setPayment] = useState(null);
    const [method, setMethod] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    if (!order) {
        return (
            <div className="payment-empty">
                <p>No hay información del pedido.</p>
                <button className="btn-primary" onClick={() => navigate("/customer/dashboard")}>
                    Volver al inicio
                </button>
            </div>
        );
    }

    // === Crear pago ===
    const handleCreatePayment = async () => {
        if (!method) {
            setError("Selecciona un método de pago.");
            return;
        }
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const paymentData = {
                orderId: order.id,
                paymentMethod: method,
                gatewayResponse: "SIMULATED_OK",
            };

            const created = await createPayment(token, paymentData);
            setPayment(created);
            setMessage(`Pago creado correctamente (${created.paymentMethod}).`);
        } catch (err) {
            console.error("❌ Error al crear pago:", err);
            setError(err.message || "No se pudo crear el pago.");
        } finally {
            setLoading(false);
        }
    };

    // === Procesar pago ===
    const handleProcessPayment = async () => {
        if (!payment) return setError("Primero debes crear el pago.");
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const processed = await processPayment(token, payment.id);
            setPayment(processed);
            setMessage("✅ Pago procesado correctamente.");

            setTimeout(() => {
                navigate("/customer/payment-success", { state: { payment: processed, order } });
            }, 1500);
        } catch (err) {
            console.error("❌ Error al procesar pago:", err);
            setError("Error al procesar el pago.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-container fade-in">
            <div className="payment-card">
                <h2>Pago del pedido</h2>
                <p className="order-number">Pedido: {order.orderNumber}</p>

                <div className="order-total">
                    <p>Total a pagar:</p>
                    <h3>${Number(order.totalAmount).toLocaleString()}</h3>
                </div>

                <h4>Selecciona tu método de pago</h4>
                <div className="payment-methods">
                    <button
                        className={`payment-option ${method === "CREDIT_CARD" ? "selected" : ""}`}
                        onClick={() => setMethod("CREDIT_CARD")}
                    >
                        <CreditCard /> Tarjeta de crédito
                    </button>
                    <button
                        className={`payment-option ${method === "PSE" ? "selected" : ""}`}
                        onClick={() => setMethod("PSE")}
                    >
                        <Wallet /> PSE / Cuenta bancaria
                    </button>
                    <button
                        className={`payment-option ${method === "NEQUI" ? "selected" : ""}`}
                        onClick={() => setMethod("NEQUI")}
                    >
                        <Smartphone /> Nequi / Daviplata
                    </button>
                </div>

                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}

                <div className="payment-actions">
                    {!payment && (
                        <button className="btn-primary" onClick={handleCreatePayment} disabled={loading}>
                            {loading ? "Creando..." : "Crear pago"}
                        </button>
                    )}

                    {payment && payment.status === "PENDING" && (
                        <button className="btn-primary" onClick={handleProcessPayment} disabled={loading}>
                            {loading ? "Procesando..." : "Procesar pago"}
                        </button>
                    )}

                    <button className="btn-secondary" onClick={() => navigate("/customer/dashboard")}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
