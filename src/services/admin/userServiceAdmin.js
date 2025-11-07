const API_URL = "http://localhost:8081/api/users";

/**
 * Obtener todos los usuarios paginados (solo ADMIN)
 */
export const getAllUsers = async (token, page = 0, size = 8) => {
    const response = await fetch(`${API_URL}?page=${page}&size=${size}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) throw new Error("Error al obtener usuarios");
    return response.json();
};

/**
 * Obtener un usuario por ID
 */
export const getUserById = async (token, id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) throw new Error("Error al obtener usuario por ID");
    return response.json();
};

/**
 * Actualizar datos del usuario
 */
export const updateUser = async (token, id, userData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            firstName: userData.firstName,
            lastName: userData.lastName,
            phone: userData.phone,
            role: userData.role,
        }),
    });

    if (!response.ok) throw new Error("Error al actualizar usuario");
    return response.json();
};

/**
 * Desactivar usuario (soft delete)
 */
export const deactivateUser = async (token, id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) throw new Error("Error al desactivar usuario");
    return response.json();
};
