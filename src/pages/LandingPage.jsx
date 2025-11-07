import React from "react";
import "../styles/landing.css";
import logo from "../assets/QuickCourierLogo.png";
import { useNavigate } from "react-router-dom";
import {
    Truck,
    MapPin,
    ShieldCheck,
    Clock,
    ClipboardList,
    CreditCard,
    Package,
    Users,
    Sparkles,
    Smartphone,
    Star,
    BadgePercent,
} from "lucide-react";

export const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container fade-in">
            {/* 🟣 Navbar */}
            <header className="landing-header">
                <div className="nav container">
                    <div className="nav-logo" onClick={() => navigate("/")}>
                        <img src={logo} alt="QuickCourier Logo" />
                        <span>QuickCourier</span>
                    </div>
                    <button className="btn-primary" onClick={() => navigate("/login")}>
                        Iniciar Sesión
                    </button>
                </div>
            </header>

            <section className="hero container">
                <div className="hero-text">
                    <h1>
                        Tu ciudad, <span>a un click de distancia</span>
                    </h1>
                    <p>
                        Envía y recibe paquetes en minutos con tecnología de entrega
                        inteligente. Rápido, seguro y fácil de usar.
                    </p>
                    <div className="hero-actions">
                        <button className="btn-primary" onClick={() => navigate("/register")}>
                            Comenzar Ahora
                        </button>
                    </div>
                </div>
                <div className="hero-image">
                    <img src="https://miro.medium.com/v2/resize:fit:1200/1*_dPrx2YqMLv2KPHA4YI5Wg.jpeg" alt="city" />
                    <div className="hero-badge">Entrega garantizada 🕒</div>
                </div>
            </section>

            <section className="metrics-section">
                <div className="container metrics-grid">
                    <div className="metric">
                        <h3>50K+</h3>
                        <p>Entregas diarias</p>
                    </div>
                    <div className="metric">
                        <h3>200K+</h3>
                        <p>Pedidos mensuales</p>
                    </div>
                    <div className="metric">
                        <h3>4.9/5</h3>
                        <p>Calificación promedio</p>
                    </div>
                    <div className="metric">
                        <h3>98%</h3>
                        <p>Satisfacción</p>
                    </div>
                </div>
            </section>

            <section id="features" className="features container">
                <h2>¿Por qué QuickCourier?</h2>
                <p className="section-desc">
                    Tecnología y servicio al cliente en primer lugar.
                </p>
                <div className="features-grid">
                    <div className="feature-card">
                        <Clock className="feature-icon" />
                        <h3>Entrega en 30min</h3>
                        <p>Recoge y entrega tus envíos más rápido que nunca.</p>
                    </div>
                    <div className="feature-card">
                        <ShieldCheck className="feature-icon" />
                        <h3>100% Seguro</h3>
                        <p>Tu paquete siempre protegido durante el trayecto.</p>
                    </div>
                    <div className="feature-card">
                        <Truck className="feature-icon" />
                        <h3>24/7 Disponible</h3>
                        <p>Servicio sin interrupciones los 7 días de la semana.</p>
                    </div>
                </div>
            </section>

            <section id="steps" className="steps-section container">
                <h2>4 pasos simples</h2>
                <p className="section-desc">
                    Desde tu pedido hasta la entrega en minutos.
                </p>
                <div className="steps-list">
                    <div className="step active">
                        <div className="step-number">1</div>
                        <MapPin className="step-icon" />
                        <div>
                            <h4>Elige tu ubicación</h4>
                            <p>Indica el origen y destino de tu envío.</p>
                        </div>
                    </div>

                    <div className="step">
                        <div className="step-number">2</div>
                        <Package className="step-icon" />
                        <div>
                            <h4>Selecciona productos</h4>
                            <p>Elige los artículos o paquetes a enviar.</p>
                        </div>
                    </div>

                    <div className="step">
                        <div className="step-number">3</div>
                        <CreditCard className="step-icon" />
                        <div>
                            <h4>Paga de forma segura</h4>
                            <p>Usa múltiples métodos de pago disponibles.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="reviews" className="reviews-section">
                <h2>Lo que dicen nuestros clientes</h2>
                <div className="reviews-grid container">
                    {[
                        { name: "Sebastian Carroz", text: "Entrega rápida y sin complicaciones. ¡Excelente servicio!" },
                        { name: "Sophy Guiza", text: "La app es muy intuitiva y el seguimiento en tiempo real me encanta." },
                        { name: "Andres Guerrero", text: "Nunca pensé que enviar un paquete fuera tan fácil. Recomendado 100%." },
                    ].map((review, i) => (
                        <div key={i} className="review-card">
                            <p>"{review.text}"</p>
                            <div className="review-footer">
                                <strong>{review.name}</strong>
                                <div className="stars">
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} className="star" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 🟣 CTA FINAL */}
            <section className="cta-section">
                <h2>¿Listo para enviar con QuickCourier?</h2>
                <p>Únete a miles de usuarios satisfechos que ya disfrutan de entregas sin estrés.</p>
                <button className="btn-primary" onClick={() => navigate("/register")}>
                    Crear mi cuenta gratis
                </button>
            </section>

            {/* ⚪ FOOTER */}
            <footer className="landing-footer">
                <p>© {new Date().getFullYear()} QuickCourier — Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};
