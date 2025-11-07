// 📁 src/services/customer/shippingExtraService.js
import axios from "axios";
const API_URL = "http://localhost:8081/api/shipping";

export const getShippingExtras = async () => {
    const res = await axios.get(`${API_URL}/extras`);
    return res.data;
};
