const API_URL = "http://localhost:8081/api/addresses";

export const getUserAddresses = async (token) => {
    const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Error al obtener direcciones");
    return response.json();
};

export const createAddress = async (token, addressData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
    });
    if (!response.ok) throw new Error("Error al crear dirección");
    return response.json();
};

export const updateAddress = async (token, id, addressData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
    });
    if (!response.ok) throw new Error("Error al actualizar dirección");
    return response.json();
};

export const deleteAddress = async (token, id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Error al eliminar dirección");
    return response.json();
};

export const setDefaultAddress = async (token, id) => {
    const response = await fetch(`${API_URL}/${id}/set-default`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Error al establecer dirección predeterminada");
    return response.json();
};

export const getDefaultAddress = async (token) => {
    const response = await fetch(`${API_URL}/default`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Error al obtener dirección predeterminada");
    return response.json();
};