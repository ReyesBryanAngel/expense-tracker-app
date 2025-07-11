import axios from "axios";

export const getInitials = (fullName) => {
    if (!fullName) return '';
    const names = fullName.trim().split(' ').filter(n => n); // remove extra spaces
    const firstInitial = names[0]?.[0] || '';
    const lastInitial = names[names.length - 1]?.[0] || '';
    return (firstInitial + lastInitial).toUpperCase();
};

export const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const parsedRefreshToken = JSON.parse(refreshToken);
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL_PROD}/users/refresh-token`, { refreshToken: parsedRefreshToken });
        localStorage.setItem("accessToken", JSON.stringify(response?.data?.accessToken));
        localStorage.setItem("refreshToken", JSON.stringify(response?.data?.refreshToken));
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const apiRequest = async (requestFn) => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    return await requestFn(accessToken);
}
