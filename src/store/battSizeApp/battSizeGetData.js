import { fetchBatteryData } from "../../api/batteries"
import { loadDischargeData, loadGraphingData, updateBatteryDataStatus, loadAdditionalData } from "./battSizeActionCreators"

export const getBatteryData = (params) => async (dispatch) => {
    try {
        dispatch(updateBatteryDataStatus("loading"))
        const {data, graphing, adinfo} = await fetchBatteryData(params)
        dispatch(loadDischargeData(data))
        dispatch(loadGraphingData(graphing))
        dispatch(loadAdditionalData(adinfo))
    }
    catch (error) {
        dispatch(updateBatteryDataStatus(error))
    }
    finally{
        dispatch(updateBatteryDataStatus("success"))
    }
}
