import React, { useState } from "react";
import { cancelOrder, confirmOrder, createOrder } from "../../services/customer/orderService";
import { useNavigate } from "react-router-dom";
import "../../styles/checkoutConfirm.css";

const CheckoutStep3Confirm = ({ token, cart, address, extras, onBack }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const extraCost = extras.reduce((sum, e) => sum + Number(e.basePrice || 0), 0);
    const iva = subtotal * 0.19;
    const total = subtotal + iva + extraCost;

    // === Crear Pedido ===
    const handleCreateOrder = async () => {
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const orderData = {
                addressId: address.id,
                items: cart.map((item) => ({
                    productId: item.id,
                    quantity: item.quantity,
                })),
                extraCodes: extras.map((e) => e.code),
            };

            const created = await createOrder(token, orderData);
            setOrder(created);
            setSuccess("Pedido creado correctamente. Ahora puedes confirmarlo o cancelarlo.");
            localStorage.removeItem("cart");
        } catch (err) {
            console.error("❌ Error al crear pedido:", err);
            setError("No se pudo crear el pedido. Intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    // === Confirmar Pedido ===
    const handleConfirmOrder = async () => {
        if (!order) return setError("Primero debes crear el pedido.");
        setLoading(true);
        try {
            const confirmed = await confirmOrder(token, order.id);
            setSuccess(`✅ Pedido ${confirmed.orderNumber} confirmado correctamente.`);
            setTimeout(() => {
                navigate("/customer/order-confirmation", { state: { order: confirmed } });
            }, 1200);
        } catch (err) {
            console.error("❌ Error al confirmar pedido:", err);
            setError("No se pudo confirmar el pedido.");
        } finally {
            setLoading(false);
        }
    };

    // === Cancelar Pedido ===
    const handleCancelOrder = async () => {
        if (!order) return setError("Primero debes crear el pedido.");
        setLoading(true);
        try {
            const cancelled = await cancelOrder(token, order.id);
            setSuccess(`🛑 Pedido ${cancelled.orderNumber} cancelado correctamente.`);
            setTimeout(() => {
                navigate("/customer/order-confirmation", { state: { order: cancelled } });
            }, 1200);
        } catch (err) {
            console.error("❌ Error al cancelar pedido:", err);
            setError("No se pudo cancelar el pedido.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-step confirm-step fade-in">
            <h3>Confirmación del pedido</h3>

            <section className="confirm-section">
                <h4>Dirección de entrega</h4>
                <p><strong>{address.addressLine1}</strong></p>
                <p>{address.city}, {address.zone}</p>
            </section>

            <section className="confirm-section">
                <h4>Productos</h4>
                {cart.map((p) => (
                    <div key={p.id} className="confirm-item">
                        <span>{p.name}</span>
                        <span>x{p.quantity}</span>
                        <span>${(p.price * p.quantity).toLocaleString()}</span>
                    </div>
                ))}
            </section>

            <section className="confirm-section">
                <h4>Extras seleccionados</h4>
                {extras.length > 0 ? (
                    extras.map((e) => (
                        <div key={e.code} className="confirm-item">
                            <span>{e.name}</span>
                            <span>${Number(e.basePrice || 0).toLocaleString()}</span>
                        </div>
                    ))
                ) : (
                    <p>Sin extras seleccionados</p>
                )}
            </section>

            <div className="confirm-totals">
                <p>Subtotal: <span>${subtotal.toLocaleString()}</span></p>
                <p>IVA (19%): <span>${iva.toLocaleString()}</span></p>
                <p>Extras: <span>${extraCost.toLocaleString()}</span></p>
                <hr />
                <p className="total-line">Total: <strong>${total.toLocaleString()}</strong></p>
            </div>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <div className="checkout-actions">
                <button className="btn-secondary" onClick={onBack} disabled={loading}>
                    Atrás
                </button>

                {!order && (
                    <button className="btn-primary" onClick={handleCreateOrder} disabled={loading}>
                        {loading ? "Creando..." : "Crear pedido"}
                    </button>
                )}

                {order && order.status === "PENDING" && (
                    <>
                        <button className="btn-primary" onClick={handleConfirmOrder} disabled={loading}>
                            {loading ? "Confirmando..." : "Confirmar pedido"}
                        </button>
                        <button className="btn-secondary" onClick={handleCancelOrder} disabled={loading}>
                            {loading ? "Cancelando..." : "Cancelar pedido"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default CheckoutStep3Confirm;
