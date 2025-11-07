const API_URL = "http://localhost:8081/api/categories";

export const getAllCategories = async (token) => {
    const response = await fetch(`${API_URL}/all`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) throw new Error("Error al obtener categorias");
    return response.json();
};


export const createCategory = async (token, categoryData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData),
    });
    if (!response.ok) throw new Error("Error al crear categoría");
    return response.json();
};

export const updateCategory = async (token, id, categoryData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData),
    });
    if (!response.ok) throw new Error("Error al actualizar categoría");
    return response.json();
};

export const deleteCategory = async (token, id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) throw new Error("Error al eliminar categoría");
    return response.json();
};
