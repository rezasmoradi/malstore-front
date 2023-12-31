import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://malstore.me:8080/api',
    // timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});


/* axiosClient.interceptors.request.use(config => {
    return config;

}, error => {
    return Promise.reject(error);
}); */

export default axiosClient;