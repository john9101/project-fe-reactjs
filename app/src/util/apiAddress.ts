import axios from 'axios';

const BASE_URL = 'https://online-gateway.ghn.vn/shiip/public-api/master-data';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Token': 'e2d70836-3dda-11ef-8ba9-b6fbcb92e37e',
    },
});

export const fetchProvinces = async () => {
    const response = await axiosInstance.get('/province');
    return response.data.data;
};

export const fetchDistricts = async (provinceId: number) => {
    const response = await axiosInstance.post('/district', { province_id: provinceId });
    return response.data.data;
};

export const fetchWards = async (districtId: number) => {
    const response = await axiosInstance.post('/ward', { district_id: districtId });
    return response.data.data;
};
