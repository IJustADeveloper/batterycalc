import { fetchBattTimeBatteryData, fetchBatteryNames } from "../../api/batteries"
import { fetchCurrencies } from "../../api/currencies"
import { loadDischargeData, loadGraphingData, updateBatteryDataStatus, loadCurrencies, updateSelectedCurrency, updateCurrenciesStatus, loadAdditionalData, loadBatteryNames, updateBatteryNamesStatus } from "./battTimeActionCreators"

export const getBatteryData = (params) => async (dispatch) => {
    try {
        dispatch(updateBatteryDataStatus("loading"))
        const {data, graphing, adinfo} = await fetchBattTimeBatteryData(params)
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

export const getCurrencies = () => async (dispatch) => {
    try {
        dispatch(updateCurrenciesStatus("loading"))
        const { currencies } = await fetchCurrencies()
        dispatch(loadCurrencies(currencies))
        dispatch(updateSelectedCurrency(Object.keys(currencies)[0]))
    }
    catch (error) {
        dispatch(updateCurrenciesStatus(error))
    }
    finally{
        dispatch(updateCurrenciesStatus("success"))
    }
}

export const getBatteryNames = () => async (dispatch) => {
    try {
        dispatch(updateBatteryNamesStatus("loading"))
        const { data } = await fetchBatteryNames()
        dispatch(loadBatteryNames(data))
    }
    catch (error) {
        dispatch(updateBatteryNamesStatus(error))
    }
    finally{
        dispatch(updateBatteryNamesStatus("success"))
    }
}