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