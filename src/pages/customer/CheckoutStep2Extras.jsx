import React, { useEffect, useState } from "react";
import { getShippingExtras } from "../../services/customer/shippingExtraService.js";

const CheckoutStep2Extras = ({ onBack, onNext, selectedExtras, setSelectedExtras }) => {
    const [extras, setExtras] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
        getShippingExtras().then(setExtras).catch(console.error);
    }, []);

    const handleToggle = (extra) => {
        const already = selectedExtras.find((e) => e.code === extra.code);
        setSelectedExtras(
            already ? selectedExtras.filter((e) => e.code !== extra.code) : [...selectedExtras, extra]
        );
    };

    const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const extraCost = selectedExtras.reduce((sum, e) => sum + Number(e.basePrice || 0), 0);
    const total = subtotal + extraCost;

    return (
        <div className="checkout-step">
            <h3>Extras opcionales</h3>
            <div className="extras-list">
                {extras.map((e) => {
                    const selected = selectedExtras.some((x) => x.code === e.code);
                    return (
                        <label key={e.code} className={`extra-card ${selected ? "active" : ""}`}>
                            <input
                                type="checkbox"
                                checked={selected}
                                onChange={() => handleToggle(e)}
                            />
                            <div>
                                <strong>{e.name}</strong>
                                <p>{e.description}</p>
                                <span className="price-tag">
                  {e.priceType === "PERCENTAGE" ? `${e.percentageValue}%` : `$${Number(e.basePrice).toLocaleString()}`}
                </span>
                            </div>
                        </label>
                    );
                })}
            </div>

            <div className="checkout-summary">
                <p>Subtotal: ${subtotal.toLocaleString()}</p>
                <p>Extras: ${extraCost.toLocaleString()}</p>
                <p className="total-line">Total: <strong>${total.toLocaleString()}</strong></p>
            </div>

            <div className="checkout-actions">
                <button className="btn-secondary" onClick={onBack}>Atrás</button>
                <button className="btn-primary" onClick={onNext}>Continuar</button>
            </div>
        </div>
    );
};

export default CheckoutStep2Extras;
