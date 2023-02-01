import axios from "axios"; 
//AXIOS INSTANCE
const BASE_URL =process.env.REACT_APP_BASEURL;
const user=JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser;
const TOKEN = user?user.accessToken:"notloggedIN";

export const publicRequest = axios.create({
    baseURL:BASE_URL,
});

export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers :{'token':`Bearer ${TOKEN}`}

});