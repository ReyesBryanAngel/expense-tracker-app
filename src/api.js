import axios from "axios";

export const getTransactions = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const parsedAccessToken = JSON.parse(accessToken);
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/transactions`, {
            headers: {
                Authorization: `Bearer ${parsedAccessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const createTransaction = async (transaction) => {
    const accessToken = localStorage.getItem("accessToken");
    const parsedAccessToken = JSON.parse(accessToken);
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/transaction`, transaction, {
            headers: {
                Authorization: `Bearer ${parsedAccessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateTransaction = async (transaction) => {
    const accessToken = localStorage.getItem("accessToken");
    const parsedAccessToken = JSON.parse(accessToken);
    try {
        const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/users/transaction/${transaction._id}`, transaction, {
            headers: {
                Authorization: `Bearer ${parsedAccessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteTransaction = async (transactionId) => {
    const accessToken = localStorage.getItem("accessToken");
    const parsedAccessToken = JSON.parse(accessToken);

    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/users/transaction/${transactionId}`, {
            headers: {
                Authorization: `Bearer ${parsedAccessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};