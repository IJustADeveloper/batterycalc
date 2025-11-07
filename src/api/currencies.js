import { instance } from "./api"

export const fetchCurrencies = async (params) => {
    try {
        const {data} = await instance.get(`/get_currencies`)
        return data
    } 
    catch (error){
        console.log("error: ", error)
    }
}