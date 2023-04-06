//  PARA A INTEGRACAO COM O BACKEND

import axios from "axios";

const api = axios.create({
    withCredentials : true,
    baseURL: `${process.env.VUE_APP_BASE_URL}/api`,

});

export default api;


