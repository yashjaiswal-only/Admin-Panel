import axios from "axios"; 
//AXIOS INSTANCE
const BASE_URL =process.env.REACT_APP_BASEURL;
const localStored=localStorage.getItem('persist:root');
const userState=localStored?JSON.parse(localStored).user:null;
const user=userState?JSON.parse(userState).currentUser:null;
// const user=JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser;
const TOKEN = user?user.accessToken:"notloggedIN";

export const publicRequest = axios.create({
    baseURL:BASE_URL,
});

export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers :{'token':`Bearer ${TOKEN}`}

});