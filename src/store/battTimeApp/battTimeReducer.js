import * as actionNames from "./battTimeActionNames"

const initialState = {
    dischargeData: null,
    graphingData: null,
    additionalData: null,

    batteryDataStatus: null,

    selectedBatteryId: null,
    checked: new Set(),
    
    currencies: null,
    currenciesStatus: null,
    selectedCurrency: null,
}


export default function battTimeReducer(state = initialState, action){
    switch (action.type){
        case actionNames.BATT_TIME_DISCHARGE_DATA_LOAD:{
            return {
                ...state,
                dischargeData: action.payload
            }
        }
        case actionNames.BATT_TIME_GRAPHING_DATA_LOAD:{
            return {
                ...state,
                graphingData: action.payload
            }
        }
        case actionNames.BATT_TIME_ADDITIONAL_DATA_LOAD:{
            return {
                ...state,
                additionalData: action.payload
            }
        }
        case actionNames.BATT_TIME_BATTERY_DATA_STATUS_UPDATE:{
            return {
                ...state,
                batteryDataStatus: action.payload
            }
        }
        case actionNames.BATT_TIME_SELECTED_BATTERY_ID_UPDATE:{
            if (state.selectedBatteryId === action.payload){
                return {
                    ...state,
                    selectedBatteryId: null
                }
            }

            return {
                ...state,
                selectedBatteryId: action.payload
            }
        }
        case actionNames.BATT_TIME_CHECKED_UPDATE:{
            if (state.checked.has(action.payload)){
                let preChecked = new Set(state.checked)
                preChecked.delete(action.payload)
                return{
                    ...state,
                    checked: new Set([...preChecked])
                }
            }
        
            return {
                ...state,
                checked: new Set([...state.checked, action.payload])
            }
        }
        case actionNames.BATT_TIME_CHECKED_CLEAR:{
            return {
                ...state,
                checked: new Set()
            }
        }
        case actionNames.BATT_TIME_CURRENCIES_LOAD:{
            return {
                ...state,
                currencies: action.payload
            }
        }
        case actionNames.BATT_TIME_CURRENCIES_STATUS_UPDATE:{
            return {
                ...state,
                currenciesStatus: action.payload
            }
        }
        case actionNames.BATT_TIME_SELECTED_CURRENCY_UPDATE:{
            return {
                ...state,
                selectedCurrency: action.payload
            }
        }
        default:{
            return state
        }
    }
} 

