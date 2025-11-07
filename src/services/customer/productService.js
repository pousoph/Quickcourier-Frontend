// src/services/customer/productService.js
const API_URL = "http://localhost:8081/api/products";

/**
 * ✅ Obtener todos los productos activos (con paginación)
 */
export const getAllProducts = async (token, page = 0, size = 6) => {
    const response = await fetch(`${API_URL}?page=${page}&size=${size}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) throw new Error("Error al obtener productos");
    return await response.json(); // Devuelve Page<ProductResponseDTO>
};

/**
 * ✅ Buscar productos (paginado)
 */
export const searchProducts = async (token, query, page = 0, size = 6) => {
    const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}&page=${page}&size=${size}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) throw new Error("Error al buscar productos");
    return await response.json();
};

/**
 * ✅ Filtrar por categoría (paginado)
 */
export const getProductsByCategory = async (token, categoryId, page = 0, size = 6) => {
    const response = await fetch(`${API_URL}/category/${categoryId}?page=${page}&size=${size}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) throw new Error("Error al filtrar productos por categoría");
    return await response.json();
};
