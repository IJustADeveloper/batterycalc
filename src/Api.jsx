import axios from "axios";
//const API_host = 'http://localhost:8000/api'
const API_host = 'https://momonga.pythonanywhere.com/api'

class Api{

    calcBatteries(params){
        const url = `${API_host}/calc_batteries?power_el=${params.power_el}&percent=${params.percent}&depth=${params.depth}&dc_time=${params.dc_time}&elements=${params.bElements}&groups=${params.groups}`
        return axios.get(url).then(response => response.data).catch(error => console.log(error))
    }

    getNames(){
        const url = `${API_host}/get_names`
        return axios.get(url).then(response => response.data).catch(error => console.log(error))
    }
    
    systemRuntimeEstimate(params){
        const url = `${API_host}/system_runtime_estimator`
        return axios.post(
            url,
            {
                'power_el': params.power_el,
                'depth': params.depth,
                'names': params.names,
                'batteries': params.bElements / 6,
                'groups': params.groups
            },
            {
                "content-type": "application/json"
            }
        ).then(response => response.data).catch(error => console.log(error))
    }

}

export default Api