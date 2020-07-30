import axios from 'axios';

const api = axios.create({
        baseURL: 'http://192.168.25.221:8080',
});

export default api;