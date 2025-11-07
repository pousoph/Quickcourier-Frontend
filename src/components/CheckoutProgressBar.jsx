import React from "react";
import "../styles/checkoutProgressBar.css";

const CheckoutProgressBar = ({ step }) => {
    const steps = [
        { id: 1, label: "Dirección" },
        { id: 2, label: "Extras" },
        { id: 3, label: "Confirmar" },
    ];

    return (
        <div className="progress-container">
            {steps.map((s, index) => (
                <div key={s.id} className="progress-step">
                    <div
                        className={`circle ${step >= s.id ? "active" : ""}`}
                    >
                        {step > s.id ? "-" : s.id}
                    </div>
                    <span className={`label ${step >= s.id ? "active" : ""}`}>
            {s.label}
          </span>

                    {/* Línea conectora entre pasos */}
                    {index < steps.length - 1 && (
                        <div className={`line ${step > s.id ? "active" : ""}`}></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CheckoutProgressBar;
