import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/checkout.css";
import CheckoutProgressBar from "../../components/CheckoutProgressBar.jsx";
import CheckoutStep1Address from "./CheckoutStep1Address.jsx";
import CheckoutStep2Extras from "./CheckoutStep2Extras.jsx";
import CheckoutStep3Confirm from "./CheckoutStep3Confirm.jsx";
import CheckoutStep4Payment from "./CheckoutStep4Payment.jsx";

const CheckoutCliente = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");

    // === ESTADOS PRINCIPALES ===
    const [step, setStep] = useState(1);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedExtras, setSelectedExtras] = useState([]);
    const [cart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
    const [order, setOrder] = useState(null); // ✅ guardamos el pedido confirmado

    // === CALLBACKS DE FLUJO ===
    const goToNext = () => setStep((prev) => prev + 1);
    const goToPrev = () => setStep((prev) => prev - 1);

    // === REDIRECCIÓN DESDE CONFIRMACIÓN ===
    const handlePaymentRedirect = (createdOrder) => {
        console.log("🟣 Pedido confirmado, pasando a pago:", createdOrder);
        setOrder(createdOrder); // guardamos el pedido para usarlo en el paso 4
        setStep(4);
    };

    // === FINALIZAR COMPRA ===
    const handleFinish = () => {
        console.log("✅ Pago finalizado. Redirigiendo al historial...");
        navigate("/customer/orders");
    };

    return (
        <div className="checkout-container">
            <CheckoutProgressBar step={step} />

            {/* === Paso 1: Dirección === */}
            {step === 1 && (
                <CheckoutStep1Address
                    token={token}
                    selectedAddress={selectedAddress}
                    setSelectedAddress={setSelectedAddress}
                    onNext={goToNext}
                />
            )}

            {/* === Paso 2: Extras === */}
            {step === 2 && (
                <CheckoutStep2Extras
                    onBack={goToPrev}
                    onNext={goToNext}
                    selectedExtras={selectedExtras}
                    setSelectedExtras={setSelectedExtras}
                />
            )}

            {/* === Paso 3: Confirmación === */}
            {step === 3 && (
                <CheckoutStep3Confirm
                    token={token}
                    cart={cart}
                    address={selectedAddress}
                    extras={selectedExtras}
                    onBack={goToPrev}
                    onPaymentRedirect={handlePaymentRedirect}
                />
            )}

            {/* === Paso 4: Pago === */}
            {step === 4 && order && (
                <CheckoutStep4Payment
                    token={token}
                    order={order}
                    onBack={() => setStep(3)}
                    onFinish={handleFinish}
                />
            )}
        </div>
    );
};

export default CheckoutCliente;
