import axios from "axios";
//const API_host = 'https://localhost:8000/api'
const API_host = 'https://momonga.pythonanywhere.com/api'

class Api{

    /*calcBatteries(params){
        const url = `${API_host}/calc_batteries?power=${params.power}&efficiency=${params.efficiency}&groups=${params.groups}&elements=${params.elements}&percent=${params.percent}&depth=${params.depth}&dc_time=${params.dc_time}&cos_fi=${params.cos_fi}`
        return axios.get(url).then(response => response.data).catch(error => console.log(error))
    }*/

    calcBatteries(params){
        const url = `${API_host}/calc_batteries?power_el=${params.power_el}&percent=${params.percent}&depth=${params.depth}&dc_time=${params.dc_time}`
        return axios.get(url).then(response => response.data).catch(error => console.log(error))
    }   

}

export default Api