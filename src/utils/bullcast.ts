import axios from 'axios';

const bullcastApi = axios.create({
    baseURL: process.env.BULLCAST_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${process.env.BULLCAST_API_KEY}`;
    return config;
});

export default bullcastApi;