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

    batteryNames: null,
    batteryNamesStatus: null,

    pickedBatteryNames: {},

    formValues: null,
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
        case actionNames.BATT_TIME_NAMES_LOAD:{
            return {
                ...state,
                batteryNames: action.payload
            }
        }
        case actionNames.BATT_TIME_NAMES_STATUS_UPDATE:{
            return {
                ...state,
                batteryNamesStatus: action.payload
            }
        }
        case actionNames.BATT_TIME_PICKED_NAMES_UPDATE:{
            switch(action.payload.answerType){
                case 'vendor':{
                    const vendor = action.payload.pickedName

                    if (state.pickedBatteryNames[vendor]){
                        let copyPickedBatteryNames = structuredClone(state.pickedBatteryNames)
                        delete copyPickedBatteryNames[vendor]
                        return {...state, pickedBatteryNames: copyPickedBatteryNames}
                    }

                    return {...state, pickedBatteryNames: {...state.pickedBatteryNames, [vendor]: {}}}
                }
                case 'series':{
                    const vendor = action.payload.header
                    const series = action.payload.pickedName

                    if (state.pickedBatteryNames[vendor][series]){
                        let copyPickedBatteryNames = structuredClone(state.pickedBatteryNames)
                        delete copyPickedBatteryNames[vendor][series]
                        return {...state, pickedBatteryNames: copyPickedBatteryNames}
                    }

                    return {
                        ...state, 
                        pickedBatteryNames: {
                            ...state.pickedBatteryNames, [vendor]: {...state.pickedBatteryNames[vendor], [series]: {}}
                        }
                    }
                }
                case 'model':{
                    const [vendor, series]  = action.payload.header.split('/')
                    const model = action.payload.pickedName

                    if (state.pickedBatteryNames[vendor][series][model]){
                        let copyPickedBatteryNames = structuredClone(state.pickedBatteryNames)
                        delete copyPickedBatteryNames[vendor][series][model]
                        return {...state, pickedBatteryNames: copyPickedBatteryNames}
                    }

                    return {
                        ...state, 
                        pickedBatteryNames: {
                            ...state.pickedBatteryNames, [vendor]: {
                                ...state.pickedBatteryNames[vendor], 
                                [series]: {...state.pickedBatteryName[vendor][series], [model]: True}
                            }
                        }
                    }
                }
            }
        }
        case actionNames.BATT_TIME_LAST_FORM_VALUES_UPDATE:{
            return {
                ...state,
                formValues: action.payload
            }
        }
        default:{
            return state
        }
    }
} 

