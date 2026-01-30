import { loadDepthOfDischargeValues } from "./actionCreators"
import * as actionNames from "./actionNames"

const initialState = {
    currencies: null,
    currenciesStatus: null,

    batteryNames: null,
    batteryNamesStatus: null,

    batteryDepthOfDischargeValues: null,
    batteryDepthOfDischargeValuesStatus: null,
}


export default function sharedReducer(state = initialState, action){
    switch (action.type){
        case actionNames.SHARED_CURRENCIES_LOAD:{
            return {
                ...state,
                currencies: action.payload
            }
        }
        case actionNames.SHARED_CURRENCIES_STATUS_UPDATE:{
            return {
                ...state,
                currenciesStatus: action.payload
            }
        }
        case actionNames.SHARED_NAMES_LOAD: {
            return {
                ...state,
                batteryNames: action.payload
            }
        }
        case actionNames.SHARED_NAMES_STATUS_UPDATE: {
            return {
                ...state,
                batteryNamesStatus: action.payload
            }
        }
        case actionNames.SHARED_DEPTH_OF_DISCHARGE_VALUES_LOAD: {
            return {
                ...state,
                batteryDepthOfDischargeValues: action.payload
            }
        }
        case actionNames.SHARED_DEPTH_OF_DISCHARGE_VALUES_STATUS_UPDATE: {
            return {
                ...state,
                batteryDepthOfDischargeValuesStatus: action.payload
            }
        }
        default:{
            return state
        }
    }
} 