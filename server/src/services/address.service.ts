import axios from 'axios';

export const getProvinces = async () => {
    try {
        const response = await axios.get('https://provinces.open-api.vn/api/p/');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching provinces');
    }
};
