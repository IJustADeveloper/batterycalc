import * as actionNames from './actionNames'

export const loadCurrencies = (currencies) => {
    return {type: actionNames.SHARED_CURRENCIES_LOAD, payload: currencies}
}

export const updateCurrenciesStatus = (currencyStatus) => {
    return {type: actionNames.SHARED_CURRENCIES_STATUS_UPDATE, payload: currencyStatus}
}

export const loadBatteryNames = (names) => {
    return {type: actionNames.SHARED_NAMES_LOAD, payload: names}
}

export const updateBatteryNamesStatus = (namesStatus) => {
    return {type: actionNames.SHARED_NAMES_STATUS_UPDATE, payload: namesStatus}
}

export const loadDepthOfDischargeValues = (depthOfDishargeValues) => {
    return {type: actionNames.SHARED_DEPTH_OF_DISCHARGE_VALUES_LOAD, payload: depthOfDishargeValues}
}

export const updateDepthOfDischargeValuesStatus = (depthOfDishargeValuesStatus) => {
    return {type: actionNames.SHARED_DEPTH_OF_DISCHARGE_VALUES_STATUS_UPDATE, payload: depthOfDishargeValuesStatus}
}