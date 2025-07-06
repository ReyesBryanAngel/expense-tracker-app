import axios from "axios";
import { apiRequest } from "../utils/globalFunctions";

export const createBill = async (bill) => {
    return await apiRequest(async (token) => {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL_DEV}/users/billing`, bill, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    })
};

export const updateBill = async (bill) => {
    return await apiRequest(async (token) => {
        const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL_DEV}/users/billing/${bill._id}`, bill, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    })
};

export const getBills = async () => {
    return await apiRequest(async (token) => {
        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL_DEV}/users/billings`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    });
};

export const deleteBill = async (billId) => {
    return await apiRequest(async (token) => {
        const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL_DEV}/users/billing/${billId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    })
};

