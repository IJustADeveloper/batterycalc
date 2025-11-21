import * as actionNames from "./battTimeActionNames"

export const loadDischargeData = (dischargeData) => {
    return {type: actionNames.BATT_TIME_DISCHARGE_DATA_LOAD, payload: dischargeData}
}

export const loadGraphingData = (graphingData) => {
    return {type: actionNames.BATT_TIME_GRAPHING_DATA_LOAD, payload: graphingData}
}

export const loadAdditionalData = (additionalData) => {
    return {type: actionNames.BATT_TIME_ADDITIONAL_DATA_LOAD, payload: additionalData}
}

export const updateBatteryDataStatus = (batteryDataStatus) => {
    return {type: actionNames.BATT_TIME_BATTERY_DATA_STATUS_UPDATE, payload: batteryDataStatus}
}

export const updateSelectedBatteryId = (selectedBatteryId) => {
    return {type: actionNames.BATT_TIME_SELECTED_BATTERY_ID_UPDATE, payload: selectedBatteryId}
}

export const updateChecked = (checkedId) => {
    return {type: actionNames.BATT_TIME_CHECKED_UPDATE, payload: checkedId}
}

export const clearChecked = () => {
    return {type: actionNames.BATT_TIME_CHECKED_CLEAR}
}

export const loadCurrencies = (currencies) => {
    return {type: actionNames.BATT_TIME_CURRENCIES_LOAD, payload: currencies}
}

export const updateCurrenciesStatus = (currencyStatus) => {
    return {type: actionNames.BATT_TIME_CURRENCIES_STATUS_UPDATE, payload: currencyStatus}
}

export const updateSelectedCurrency = (selectedCurrency) => {
    return {type: actionNames.BATT_TIME_SELECTED_CURRENCY_UPDATE, payload: selectedCurrency}
}

export const loadBatteryNames = (names) => {
    return {type: actionNames.BATT_TIME_NAMES_LOAD, payload: names}
}

export const updateBatteryNamesStatus = (namesStatus) => {
    return {type: actionNames.BATT_TIME_NAMES_STATUS_UPDATE, payload: namesStatus}
}

export const updatePickedBatteryNames = (answerType, header, pickedName) => {
    return {type: actionNames.BATT_TIME_PICKED_NAMES_UPDATE, payload: {answerType: answerType, header: header, pickedName: pickedName}}
}

export const updateFormValues = (formValues) => {
    return {type: actionNames.BATT_TIME_LAST_FORM_VALUES_UPDATE, payload: formValues}
}