import axios from "axios";
import {showMessage} from "@/composables/utils.js";


const instance = axios.create({
    baseURL: "/",
    timeout: 7000,
});

instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    let status = error.response.code;

    let errorMsg = error.response.message || '请求失败';
    showMessage(errorMsg, 'error')
    return Promise.reject(error)
})

export default instance;