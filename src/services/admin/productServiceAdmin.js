// src/services/admin/productServiceAdmin.js
const API_URL = "http://localhost:8081/api/products";

// ✅ Obtener productos con paginación
export const getAllProducts = async (token, page = 0, size = 10) => {
    const response = await fetch(`${API_URL}?page=${page}&size=${size}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Error al obtener productos");
    return response.json();
};

// ✅ Obtener productos por categoría con paginación
export const getProductsByCategory = async (token, categoryId, page = 0, size = 10) => {
    const response = await fetch(`${API_URL}/category/${categoryId}?page=${page}&size=${size}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Error al obtener productos por categoría");
    return response.json();
};

// ✅ Productos con bajo stock (ya tenía paginación, corregimos token)
export const getLowStockProducts = async (token, threshold = 10, page = 0, size = 10) => {
    const response = await fetch(
        `${API_URL}/low-stock?threshold=${threshold}&page=${page}&size=${size}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    if (!response.ok) throw new Error("Error al obtener productos con stock bajo");
    return response.json();
};

// ✅ Crear producto
export const createProduct = async (token, productData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error("Error al crear producto");
    return response.json();
};

// ✅ Actualizar producto
export const updateProduct = async (token, id, productData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error("Error al actualizar producto");
    return response.json();
};

// ✅ Eliminar producto
export const deleteProduct = async (token, id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Error al eliminar producto");
    return response.json();
};
