const currencyConverter = (amount, currencies, initialCurrency, targetCurrency) => {
    return Math.ceil(amount * currencies[initialCurrency].equivalent / currencies[initialCurrency].currency_amount * currencies[targetCurrency].currency_amount / currencies[targetCurrency].equivalent)
}

export default currencyConverter