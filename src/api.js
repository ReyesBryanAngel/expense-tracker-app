import axios from "axios";
import { apiRequest } from "./utils/globalFunctions";

export const getTransactions = async () => {
    return await apiRequest(async (token) => {
        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/users/transactions`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    });
};

export const createTransaction = async (transaction) => {
    return await apiRequest(async (token) => {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/transaction`, transaction, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    })
};

export const updateTransaction = async (transaction) => {
    return await apiRequest(async (token) => {
        const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/users/transaction/${transaction._id}`, transaction, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    })
};

export const deleteTransaction = async (transactionId) => {
    return await apiRequest(async (token) => {
        const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/users/transaction/${transactionId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    })
};

export const uploadPhoto = async (file) => {
    return await apiRequest(async (token) => {
        const formData = new FormData();
        formData.append('photo', file);

        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/upload-photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    })
};

export const getPhoto = async () => {
  return apiRequest(async (token) => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/get-photo`, {
      responseType: 'blob',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return URL.createObjectURL(response.data);
  });
};