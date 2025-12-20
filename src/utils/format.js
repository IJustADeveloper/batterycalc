import currencyConverter from "./currencyConverter"

export const formatNumbers = (value) => {
    return value.toFixed(2)
}

export const formatBooleanToYesNo = (value) => {
    return value ? 'Yes' : 'No'
}

export const formatMargin = (value) => {
    return value + '%'
}

export const formatTimeFromMinutes = (value) => {
    if (value === null) return '-'
    else {
        let h = Math.floor(value / 60)
        let m = Math.floor(value % 60)
        let s = Math.floor((value % 1)*60)
        return `${h}:${m < 10 ? "0" + m : m}:${ s < 10 ? "0" + s : s}`
    }
}

export const formatPrice = (price) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")

export const formatBatteryPrice = (value, currencies, selectedCurrency) => {
    value = structuredClone(value)
    if (value.price_min !== null && value.currency !== null){
        value.price_min = currencyConverter(value.price_min, currencies, value.currency, selectedCurrency)
    }
    return value
}