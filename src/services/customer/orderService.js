// src/services/customer/orderService.js
import axios from "axios";

const API_URL = "http://localhost:8081/api/orders";

// Crear pedido
export const createOrder = async (token, orderData) => {
    const response = await axios.post(API_URL, orderData, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Confirmar pedido
export const confirmOrder = async (token, orderId) => {
    const response = await axios.patch(`${API_URL}/${orderId}/confirm`, null, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Cancelar pedido
export const cancelOrder = async (token, orderId) => {
    const response = await axios.patch(`${API_URL}/${orderId}/cancel`, null, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Obtener historial del usuario con paginación
export const getMyOrders = async (token, page = 0, size = 10) => {
    const response = await axios.get(`${API_URL}/my-orders?page=${page}&size=${size}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data; // devuelve un PageResponseDTO
};

// Obtener detalles de un pedido específico
export const getOrderById = async (token, id) => {
    const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};