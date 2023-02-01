import axios from "axios"; 
//AXIOS INSTANCE
const BASE_URL =process.env.REACT_APP_BASEURL;
const localStored=localStorage.getItem('persist:root');
const userState=localStored?JSON.parse(localStored).user:null;
const user=userState?JSON.parse(userState).currentUser:null;
const TOKEN = user?user.accessToken:"notloggedIN";

//main disadvantage of local storage is that it doen't update on newly logined , and accesstoken not stored in local storage
//we need to wait or refresh 
export const publicRequest = axios.create({
    baseURL:BASE_URL,
});

export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers :{'token':`Bearer ${TOKEN}`}

});