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
    Smartphone,
    Users,
    Sparkles, BadgePercent,
} from "lucide-react";

export const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container fade-in">
            <header className="topbar">
                <div className="topbar-content container">
                    <div className="logo-section" onClick={() => navigate("/")}>
                        <img src={logo} alt="QuickCourier logo" className="topbar-logo" />
                        <span className="logo-text">QuickCourier</span>
                    </div>
                    <button className="topbar-btn" onClick={() => navigate("/login")}>
                        Iniciar Sesión
                    </button>
                </div>
            </header>

            {/* 🟣 HERO */}
            <section className="landing-hero container">
                <div className="hero-content">
                    <div className="hero-left">
                        <div className="hero-logo-box">
                            <img src={logo} alt="QuickCourier Logo" className="hero-logo" />
                        </div>
                        <h1>Tu entrega, más rápida que nunca 🚀</h1>
                        <p>
                            QuickCourier transforma la forma de hacer envíos urbanos: rápidos,
                            seguros y con seguimiento en tiempo real. Tecnología que trabaja por ti.
                        </p>
                        <div className="btn-group">
                            <button className="btn-secondary" onClick={() => navigate("/login")}>
                                Comenzar Ahora
                            </button>
                        </div>
                    </div>

                    <div className="hero-right">
                        <div className="delivery-icon-box">
                            <Truck className="truck-icon" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="why-section">
                <h2>¿Por qué elegir QuickCourier?</h2>
                <p className="section-desc">
                    Ofrecemos un servicio de entregas urbanas con tecnología de punta y atención al detalle.
                </p>
                <div className="why-grid container">
                    <div className="why-card">
                        <BadgePercent className="why-icon" />
                        <h3>Promociones</h3>
                        <p>Recibe promociones los fines de semana.</p>
                    </div>
                    <div className="why-card">
                        <ShieldCheck className="why-icon" />
                        <h3>100% Seguro</h3>
                        <p>Todos tus envíos están protegidos.</p>
                    </div>
                    <div className="why-card">
                        <Clock className="why-icon" />
                        <h3>24/7 Disponible</h3>
                        <p>Servicio continuo todos los días del año, sin interrupciones.</p>
                    </div>
                </div>
            </section>

            {/* ⚙️ CÓMO FUNCIONA */}
            <section className="process-section container">
                <h2>¿Cómo funciona?</h2>
                <p className="section-desc">En solo tres pasos tu paquete estará en camino 🛵</p>
                <div className="process-steps">
                    <div className="process-line"></div>

                    <div className="process-step">
                        <div className="circle">1</div>
                        <ClipboardList className="process-icon" />
                        <h3>Ingresa los detalles</h3>
                        <p>Completa el formulario con origen, destino y tipo de paquete.</p>
                    </div>

                    <div className="process-step">
                        <div className="circle">2</div>
                        <Package className="process-icon" />
                        <h3>Selecciona extras</h3>
                        <p>Añade seguro, empaque especial o entrega exprés según tus necesidades.</p>
                    </div>

                    <div className="process-step">
                        <div className="circle">3</div>
                        <CreditCard className="process-icon" />
                        <h3>Paga y listo</h3>
                        <p>Confirma tu pedido.</p>
                    </div>
                </div>
            </section>

            {/* 💎 BENEFICIOS ADICIONALES */}
            <section className="benefits-section container">
                <h2>Ventajas que te encantarán</h2>
                <div className="benefits-grid">
                    <div className="benefit-card">
                        <Smartphone className="benefit-icon" />
                        <h3>App Inteligente</h3>
                        <p>Gestiona tus pedidos desde tu móvil con una interfaz fluida y moderna.</p>
                    </div>
                    <div className="benefit-card">
                        <Users className="benefit-icon" />
                        <h3>Repartidores Confiables</h3>
                        <p>Solo mensajeros verificados con historial impecable de servicio.</p>
                    </div>
                    <div className="benefit-card">
                        <Sparkles className="benefit-icon" />
                        <h3>Experiencia Premium</h3>
                        <p>Disfruta de un servicio rápido, seguro y con atención personalizada.</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section">
                <h2>¿Preparado?</h2>
                <p>
                    Miles de usuarios ya confían en QuickCourier. Súmate hoy y vive la
                    experiencia de la entrega sin estrés.
                </p>
                <button onClick={() => navigate("/register")}>Crear mi cuenta gratis</button>
            </section>

            <footer className="landing-footer">
                <p>© {new Date().getFullYear()} QuickCourier — Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};
