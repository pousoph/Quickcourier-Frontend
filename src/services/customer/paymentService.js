import axios from "axios";

const API_URL = "http://localhost:8081/api/payments";

export const createPayment = async (token, paymentData) => {
    const response = await axios.post(API_URL, paymentData, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const processPayment = async (token, paymentId) => {
    const response = await axios.post(`${API_URL}/${paymentId}/process`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
