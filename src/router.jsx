import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { DashboardCliente } from "./pages/customer/DashboardCliente";
import { DashboardAdmin } from "./pages/admin/DashboardAdmin";
import {RegisterPage} from "./pages/RegisterPage.jsx";

export const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/customer/dashboard" element={<DashboardCliente />} />
            <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        </Routes>
    </BrowserRouter>
);
