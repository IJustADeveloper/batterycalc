import axios from "axios";

const API_host = 'https://momonga.pythonanywhere.com/api'

export const instance = axios.create({
    baseURL: API_host,
})
