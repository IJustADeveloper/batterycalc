import * as actionNames from './battSizeActionNames'

export const loadDischargeData = (dischargeData) => {
    return {type: actionNames.BATT_SIZE_DISCHARGE_DATA_LOAD, payload: dischargeData}
}

export const loadGraphingData = (graphingData) => {
    return {type: actionNames.BATT_SIZE_GRAPHING_DATA_LOAD, payload: graphingData}
}

export const loadAdditionalData = (additionalData) => {
    return {type: actionNames.BATT_SIZE_ADDITIONAL_DATA_LOAD, payload: additionalData}
}

export const updateBatteryDataStatus = (batteryDataStatus) => {
    return {type: actionNames.BATT_SIZE_BATTERY_DATA_STATUS_UPDATE, payload: batteryDataStatus}
}

export const updateSelectedBatteryId = (selectedBatteryId) => {
    return {type: actionNames.BATT_SIZE_SELECTED_BATTERY_ID_UPDATE, payload: selectedBatteryId}
}

export const updateChecked = (checkedId) => {
    return {type: actionNames.BATT_SIZE_CHECKED_UPDATE, payload: checkedId}
}

export const clearChecked = () => {
    return {type: actionNames.BATT_SIZE_CHECKED_CLEAR}
}

export const loadCurrencies = (currencies) => {
    return {type: actionNames.BATT_SIZE_CURRENCIES_LOAD, payload: currencies}
}

export const updateCurrenciesStatus = (currencyStatus) => {
    return {type: actionNames.BATT_SIZE_CURRENCIES_STATUS_UPDATE, payload: currencyStatus}
}

export const updateSelectedCurrency = (selectedCurrency) => {
    return {type: actionNames.BATT_SIZE_SELECTED_CURRENCY_UPDATE, payload: selectedCurrency}
}
