import axios from "axios";

//const API_host = 'https://momonga.pythonanywhere.com/api'
const API_host = 'http://localhost:8000/api'

export const instance = axios.create({
    baseURL: API_host,
})
