const API_URL = "http://localhost:8081/api/auth";

export const loginUser = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        let errorMessage = "Error al iniciar sesión";

        try {
            const errorData = await response.json();

            // Captura diferentes tipos de error del backend
            if (typeof errorData === "object") {
                errorMessage =
                    errorData.message ||
                    errorData.error ||
                    errorData.email ||
                    errorData.password ||
                    JSON.stringify(errorData);
            } else {
                errorMessage = errorData;
            }
        } catch {
            errorMessage = "No se pudo procesar la respuesta del servidor";
        }

        throw new Error(errorMessage);
    }

    return await response.json();
};


export const registerUser = async (data) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrarse");
    }

    return await response.json();
};
