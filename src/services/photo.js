import axios from "axios";
import { apiRequest } from "../utils/globalFunctions";
export const uploadPhoto = async (file) => {
    return await apiRequest(async (token) => {
        const formData = new FormData();
        formData.append('photo', file);

        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL_PROD}/users/upload-photo`, formData, {
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
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL_PROD}/users/get-photo`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data.photo;
  });
};