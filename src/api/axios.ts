// HERE

import axios from 'axios';

// _PIN_ Nginx proxy : 'http://127.0.0.1:81/api/v1';

// _PIN_ Local Server : 'http://127.0.0.1:8000/api/v1';

const BASE_URL = 'http://127.0.0.1:81/api/v1';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});




