import { fetchCurrencies } from "../../api/currencies"
import { fetchBatteryDepthOfDischargValues, fetchBatteryNames } from "../../api/batteries"
import { loadCurrencies, updateCurrenciesStatus, loadBatteryNames, updateBatteryNamesStatus, loadDepthOfDischargeValues, updateDepthOfDischargeValuesStatus } from "./actionCreators"

import { updateSelectedCurrency as battSizeUpdateSelectedCurrency } from '../battSizeApp/battSizeActionCreators'
import { updateSelectedCurrency as battTimeUpdateSelectedCurrency } from '../battTimeApp/battTimeActionCreators'


export const getCurrencies = () => async (dispatch) => {
    try {
        dispatch(updateCurrenciesStatus("loading"))
        const { currencies } = await fetchCurrencies()
        dispatch(loadCurrencies(currencies))
        dispatch(battSizeUpdateSelectedCurrency(Object.keys(currencies)[0]))
        dispatch(battTimeUpdateSelectedCurrency(Object.keys(currencies)[0]))
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

export const getBatteryDepthOfDischargeValues = () => async (dispatch) => {
    try {
        dispatch(updateDepthOfDischargeValuesStatus("loading"))
        const { data } = await fetchBatteryDepthOfDischargValues()
        dispatch(loadDepthOfDischargeValues(data))
    }
    catch (error){
        dispatch(updateDepthOfDischargeValuesStatus(error))
    }
    finally {
        dispatch(updateDepthOfDischargeValuesStatus("success"))
    }
}