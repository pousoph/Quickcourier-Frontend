import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { CatalogoCliente } from "./pages/customer/CatalogoCliente.jsx";
import { DashboardAdmin } from "./pages/admin/DashboardAdmin";
import {RegisterPage} from "./pages/RegisterPage.jsx";
import {CarritoCliente} from "./components/CarritoCliente.jsx";
import CheckoutCliente from "./pages/customer/CheckoutCliente.jsx";
import OrderConfirmationPage from "./pages/customer/OrderConfirmationPage.jsx";
import PaymentPage from "./pages/customer/PaymentPage.jsx";
import PaymentSuccessPage from "./pages/customer/PaymentSuccessPage.jsx";
import ProfileCliente from "./pages/customer/ProfileCliente.jsx";
import AddressManager from "./pages/customer/AddressManager.jsx";
import OrderHistory from "./pages/customer/OrderHistory.jsx";

export const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/customer/dashboard" element={<CatalogoCliente />} />
            <Route path="/customer/profile" element={<ProfileCliente />} />
            <Route path="/customer/addresses" element={<AddressManager />} />
            <Route path="/customer/orders" element={<OrderHistory />} />
            <Route path="/customer/cart" element={<CarritoCliente />} />
            <Route path="/customer/checkout" element={<CheckoutCliente />} />
            <Route path="/customer/order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="/customer/payment" element={<PaymentPage />} />
            <Route path="/customer/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/admin/dashboard" element={<DashboardAdmin />} />

        </Routes>
    </BrowserRouter>
);
