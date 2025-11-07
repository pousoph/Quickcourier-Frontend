import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/carrito.css";
import { ArrowLeft, Trash2 } from "lucide-react";

export const CarritoCliente = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    const handleRemove = (id) => {
        const updated = cart.filter((item) => item.id !== id);
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    };

    const handleQuantityChange = (id, amount) => {
        const updated = cart.map((item) =>
            item.id === id
                ? { ...item, quantity: Math.max(1, item.quantity + amount) }
                : item
        );
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    };

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Tu carrito está vacío");
            return;
        }
        navigate("/customer/checkout");
    };

    return (
        <div className="carrito-container fade-in">
            {/* 🔙 Header */}
            <header className="carrito-header">
                <button className="btn-volver" onClick={() => navigate("/customer/dashboard")}>
                    <ArrowLeft size={18} /> Volver al catálogo
                </button>
                <h2>Tu Carrito</h2>
            </header>

            {cart.length === 0 ? (
                <p className="carrito-vacio">Tu carrito está vacío</p>
            ) : (
                <div className="carrito-layout">
                    {/* 🧺 Lista de productos */}
                    <div className="carrito-productos">
                        <h3>Productos en tu carrito</h3>
                        {cart.map((item) => (
                            <div key={item.id} className="carrito-item">
                                <div className="carrito-img">
                                    <img
                                        src={item.imageUrl || "https://via.placeholder.com/100x100?text=Sin+imagen"}
                                        alt={item.name}
                                    />
                                </div>

                                <div className="carrito-detalle">
                                    <h4>{item.name}</h4>
                                    <p className="carrito-descripcion">
                                        {item.description || "Sin descripción"}
                                    </p>
                                    <div className="carrito-controles">
                                        <div className="cantidad-control">
                                            <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                                        </div>
                                        <span className="carrito-precio">
                                            ${(item.price * item.quantity).toLocaleString()}
                                        </span>
                                    </div>
                                    <button
                                        className="btn-eliminar"
                                        onClick={() => handleRemove(item.id)}
                                    >
                                        <Trash2 size={16} /> Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 💰 Resumen */}
                    <div className="carrito-resumen">
                        <h3>Resumen de compra</h3>
                        <div className="resumen-detalle">
                            <p>
                                <span>Productos:</span>
                                <span>${total.toLocaleString()}</span>
                            </p>
                            <p>
                                <span>Envío:</span>
                                <span className="envio-gratis">Gratis</span>
                            </p>
                            <p className="total-linea">
                                <span>Total:</span>
                                <span className="total-precio">${total.toLocaleString()}</span>
                            </p>
                        </div>
                        <button className="btn-continuar" onClick={handleCheckout}>
                            Continuar compra
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
