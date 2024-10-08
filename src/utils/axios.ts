// HERE

import axios from 'axios';

// _PIN_ Nginx proxy : 'http://127.0.0.1:81/api/v1';

// _PIN_ Local Server : 'http://127.0.0.1:8000/api/v1';

const BASE_URL = 'http://127.0.0.1:81/api/v1';

export const axiosDefault = axios.create({
    baseURL: BASE_URL,
});


// NOTE
// For requests made to the same origin (same domain), 
// cookies are automatically included in the headers without the need for withCredentials. 
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});




