import * as actionNames from './battSizeActionNames'

export const loadSolutionData = (solutionData) => {
    return {type: actionNames.BATT_SIZE_SOLUTION_DATA_LOAD, payload: solutionData}
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

export const updateSelectedSolutionId = (selectedSolutionId) => {
    return {type: actionNames.BATT_SIZE_SELECTED_SOLUTION_ID_UPDATE, payload: selectedSolutionId}
}

export const updateChecked = (checkedId) => {
    return {type: actionNames.BATT_SIZE_CHECKED_UPDATE, payload: checkedId}
}

export const clearChecked = () => {
    return {type: actionNames.BATT_SIZE_CHECKED_CLEAR}
}

export const updateSelectedCurrency = (selectedCurrency) => {
    return {type: actionNames.BATT_SIZE_SELECTED_CURRENCY_UPDATE, payload: selectedCurrency}
}

export const updateFormValues = (formValues) => {
    return {type: actionNames.BATT_SIZE_LAST_FORM_VALUES_UPDATE, payload: formValues}
}