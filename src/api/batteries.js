import { instance } from "./api";

export const fetchBatteryData = async (params) => {
    try{
        const {data} = await instance.get(`/calc_batteries?power_el=${params.power_el}&percent=${params.percent}&depth=${params.depth}&dc_time=${params.dc_time}&elements=${params.bElements}&groups=${params.groups}`)
        return data
    }
    catch (error) {
        console.log("error: ", error)
    }
}

export const fetchBattTimeBatteryData = async (params) => {
    try {
        const { data } = await instance.post(
            `/system_runtime_estimator`, 
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
        )
        return data
    }
    catch (error){
        console.log("error: ", error)
    }
}
