import React, { useEffect, useState } from "react";
import {
    getAllShippingRules,
    getShippingRuleByCode,
} from "../../services/admin/ShippingService.js";
import "../../styles/shippingRules.css";

export const ShippingRules = () => {
    const [rules, setRules] = useState([]);
    const [ruleByCode, setRuleByCode] = useState(null);
    const [searchCode, setSearchCode] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("accessToken");

    // Cargar todas las reglas
    const fetchRules = async () => {
        try {
            const data = await getAllShippingRules(token);
            setRules(data || []);
        } catch (err) {
            console.error("Error cargando reglas:", err);
            setError("No tienes permisos o el token ha expirado.");
        } finally {
            setLoading(false);
        }
    };

    // Buscar una regla específica por su código
    const handleSearchRule = async (e) => {
        e.preventDefault();
        if (!searchCode.trim()) return;

        try {
            const data = await getShippingRuleByCode(token, searchCode.trim());
            setRuleByCode(data);
            setError(null);
        } catch (err) {
            console.error("Error buscando regla por código:", err);
            setRuleByCode(null);
            setError("No se encontró ninguna regla con ese código.");
        }
    };

    useEffect(() => {
        fetchRules();
    }, []);

    if (loading) return <div className="loading">Cargando reglas de envío...</div>;
    if (error && rules.length === 0) return <div className="error">{error}</div>;

    return (
        <div className="shipping-container">
            <h2 className="page-title">Administración de Reglas de Envío</h2>

            {/* --- Tabla 1: Todas las reglas --- */}
            <section className="section-table">
                <h3>Todas las Reglas Activas</h3>
                {rules.length === 0 ? (
                    <p className="no-data">No hay reglas de envío registradas.</p>
                ) : (
                    <table className="shipping-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Prioridad</th>
                            <th>Activo</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rules.map((r) => (
                            <tr key={r.id}>
                                <td>{r.id}</td>
                                <td>{r.code}</td>
                                <td>{r.name}</td>
                                <td>{r.ruleType}</td>
                                <td>{r.priority}</td>
                                <td className={r.isActive ? "active" : "inactive"}>
                                    {r.isActive ? "Sí" : "No"}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </section>

            {/* --- Tabla 2: Buscar por código --- */}
            <section className="section-table">
                <h3>Buscar Regla por Código</h3>

                <form onSubmit={handleSearchRule} className="search-form">
                    <input
                        type="text"
                        placeholder="Ejemplo: WEEKEND_PROMO"
                        value={searchCode}
                        onChange={(e) => setSearchCode(e.target.value)}
                    />
                    <button type="submit">Buscar</button>
                </form>

                {ruleByCode && (
                    <table className="shipping-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Prioridad</th>
                            <th>Activo</th>
                            <th>Creado</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{ruleByCode.id}</td>
                            <td>{ruleByCode.code}</td>
                            <td>{ruleByCode.name}</td>
                            <td>{ruleByCode.ruleType}</td>
                            <td>{ruleByCode.priority}</td>
                            <td className={ruleByCode.isActive ? "active" : "inactive"}>
                                {ruleByCode.isActive ? "Sí" : "No"}
                            </td>
                            <td>{ruleByCode.createdAt?.slice(0, 10)}</td>
                        </tr>
                        </tbody>
                    </table>
                )}

                {ruleByCode && (
                    <div className="rule-details">
                        <h4>Detalles adicionales</h4>
                        <p><strong>Descripción:</strong> {ruleByCode.description}</p>
                        {ruleByCode.configuration && (
                            <>
                                <h4>Configuración</h4>
                                <pre>{JSON.stringify(ruleByCode.configuration, null, 2)}</pre>
                            </>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};
