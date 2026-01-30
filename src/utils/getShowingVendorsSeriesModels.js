const getShowingVendorSeriesModels = (batteryNames, pickedBatteryNames) => {
    let showingVendors = { 'Brands': {} }
    Object.keys(batteryNames).forEach(vendorName => {
        showingVendors['Brands'][vendorName] = vendorName in pickedBatteryNames
    })

    let showingSeries = {}
    let showingModels = {}
    Object.keys(pickedBatteryNames).forEach(vendorName => {
        showingSeries[vendorName] = {}
        Object.keys(batteryNames[vendorName]).forEach(seriesName => {
            showingSeries[vendorName][seriesName] = seriesName in pickedBatteryNames[vendorName]
        })

        Object.keys(pickedBatteryNames[vendorName]).forEach(seriesName => {
            showingModels[`${vendorName}/${seriesName}`] = {}
            batteryNames[vendorName][seriesName].forEach(modelName => {
                showingModels[`${vendorName}/${seriesName}`][modelName] = modelName in pickedBatteryNames[vendorName][seriesName]
            })
        })
    })

    return [showingVendors, showingSeries, showingModels]
}

export default getShowingVendorSeriesModels