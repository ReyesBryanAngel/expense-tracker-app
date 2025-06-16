import axios from "axios";

export const getTransactions = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const parsedAccessToken = JSON.parse(accessToken);
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/transaction`, {
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