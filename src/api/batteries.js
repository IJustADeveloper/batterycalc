import { instance } from "./api";

/*export const fetchBatteryData = async (params) => {
    try{
        const {data} = await instance.get(`/calc_batteries?power_el=${params.power_el}&percent=${params.percent}&depth=${params.depth}&dc_time=${params.dc_time}&elements=${params.bElements}&groups=${params.groups}`)
        return data
    }
    catch (error) {
        console.log("error: ", error)
    }
}*/

export const fetchBatteryData = async (params) => {
    try{
        const {data} = await instance.get(`/battsize?s_load=${params.sLoad}&power_factor=${params.cos_fi}&inv_eff=${params.invEff}&min_Q_batt=${params.minQBatt}&max_Q_batt=${params.maxQBatt}&min_Q_strings=${params.minQStrings}&max_Q_strings=${params.maxQStrings}&dc_time=${params.dcTime}&depth=${params.depth}&margin=${params.margin}&in_respect_to_tEOL=${params.inRespectToTEOL}`)
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

export const fetchBatteryNames = async () => {
    try {
        const { data } = await instance.get(`/get_names`)
        return data
    }
    catch (error){
        console.log("error: ", error)
    }
}

export const fetchBatteryDepthOfDischargValues = async () => {
    try {
        const { data } = await instance.get(`/get_depth_of_discharge_values`)
        return data
    }
    catch (error){
        console.log("error: ", error)
    }
}

