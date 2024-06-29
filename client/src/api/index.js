import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000",
    
});

export const signup = (authdata)=> API.post("/user/signup",authdata);
export const login = (authdata)=> API.post("/user/login",authdata);
