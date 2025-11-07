const BASE_URL = "http://localhost:8081/api/shipping";

/**
 * Obtiene todas las reglas de envío activas (solo ADMIN)
 */
export const getAllShippingRules = async (token) => {
    const response = await fetch(`${BASE_URL}/rules`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) throw new Error("Error al obtener reglas de envío");
    return response.json();
};

/**
 * Obtiene una regla específica por su código (solo ADMIN)
 */
export const getShippingRuleByCode = async (token, code) => {
    const response = await fetch(`${BASE_URL}/rules/${code}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) throw new Error("Error al obtener la regla de envío");
    return response.json();
};
