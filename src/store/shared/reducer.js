import * as actionNames from "./actionNames"

const initialState = {
    currencies: null,
    currenciesStatus: null,

    batteryNames: null,
    batteryNamesStatus: null,
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
        default:{
            return state
        }
    }
} 