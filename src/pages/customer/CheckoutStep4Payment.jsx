import React, { useState } from "react";
import { createPayment, processPayment } from "../../services/customer/paymentService.js";
import "../../styles/checkoutPayment.css";

const CheckoutStep4Payment = ({ token, order, onBack, onFinish }) => {
    const [payment, setPayment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleCreatePayment = async () => {
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const paymentData = {
                orderId: order.id,
                paymentMethod: "Tarjeta Débito", // o seleccionable
                gatewayResponse: "Simulación de pago local",
            };

            const created = await createPayment(token, paymentData);
            setPayment(created);
            setSuccess("✅ Pago creado correctamente. Ahora puedes procesarlo.");
        } catch (err) {
            console.error("❌ Error al crear pago:", err);
            setError("No se pudo crear el pago.");
        } finally {
            setLoading(false);
        }
    };

    const handleProcessPayment = async () => {
        if (!payment) return setError("Primero debes crear el pago.");
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const processed = await processPayment(token, payment.id);
            setPayment(processed);
            setSuccess("💳 Pago procesado exitosamente.");
            setTimeout(() => onFinish(processed), 2000);
        } catch (err) {
            console.error("❌ Error al procesar pago:", err);
            setError("No se pudo procesar el pago.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-step payment-step">
            <h3>Pago del pedido</h3>

            <section className="payment-summary">
                <p><strong>Número de pedido:</strong> {order.orderNumber}</p>
                <p><strong>Total a pagar:</strong> ${order.totalAmount.toLocaleString()}</p>
                <p><strong>Estado del pedido:</strong> {order.status}</p>
            </section>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <div className="checkout-actions">
                <button className="btn-secondary" onClick={onBack} disabled={loading}>Atrás</button>

                {!payment && (
                    <button className="btn-primary" onClick={handleCreatePayment} disabled={loading}>
                        {loading ? "Creando pago..." : "Crear pago"}
                    </button>
                )}

                {payment && payment.status === "PENDING" && (
                    <button className="btn-primary" onClick={handleProcessPayment} disabled={loading}>
                        {loading ? "Procesando pago..." : "Procesar pago"}
                    </button>
                )}

                {payment && payment.status === "COMPLETED" && (
                    <button className="btn-success" onClick={() => onFinish(payment)}>
                        Finalizar
                    </button>
                )}
            </div>
        </div>
    );
};

export default CheckoutStep4Payment;
