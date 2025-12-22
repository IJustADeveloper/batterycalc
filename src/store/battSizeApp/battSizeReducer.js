import * as actionNames from "./battSizeActionNames"

const initialState = {
    dischargeData: null,
    graphingData: null,
    additionalData: null,

    batteryDataStatus: null,

    selectedBatteryId: null,
    checked: new Set(),

    selectedCurrency: null,

    formValues: null,
}


export default function battSizeReducer(state = initialState, action){
    switch (action.type){
        case actionNames.BATT_SIZE_DISCHARGE_DATA_LOAD:{
            return {
                ...state,
                dischargeData: action.payload
            }
        }
        case actionNames.BATT_SIZE_GRAPHING_DATA_LOAD:{
            return {
                ...state,
                graphingData: action.payload
            }
        }
        case actionNames.BATT_SIZE_ADDITIONAL_DATA_LOAD:{
            return {
                ...state,
                additionalData: action.payload
            }
        }
        case actionNames.BATT_SIZE_BATTERY_DATA_STATUS_UPDATE:{
            return {
                ...state,
                batteryDataStatus: action.payload
            }
        }
        case actionNames.BATT_SIZE_SELECTED_BATTERY_ID_UPDATE:{
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
        case actionNames.BATT_SIZE_CHECKED_UPDATE:{
            if (state.checked.has(action.payload)){
                let preChecked = new Set(state.checked)
                preChecked.delete(action.payload)
                return {
                    ...state,
                    checked: new Set([...preChecked])
                }
            }
            
            return {
                ...state,
                checked: new Set([...state.checked, action.payload])
            }
        }
        case actionNames.BATT_SIZE_CHECKED_CLEAR:{
            return {
                ...state,
                checked: new Set()
            }
        }
        case actionNames.BATT_SIZE_SELECTED_CURRENCY_UPDATE:{
            return {
                ...state,
                selectedCurrency: action.payload
            }
        }
        case actionNames.BATT_SIZE_LAST_FORM_VALUES_UPDATE:{
            return{
                ...state,
                formValues: action.payload
            }
        }
        default:{
            return state
        }
    }
} 

