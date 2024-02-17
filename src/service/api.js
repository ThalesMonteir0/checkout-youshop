import axios from "axios";


export const apiInstance = axios.create({
    baseURL: 'https://api.deepspacestore.com/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',

    }
});
