function BatteryCalcValidation(data, currencies, selectedCurrency){

    let arr = data

    for (let i=0; i<arr.length; i++){
        for (let [key, value] of Object.entries(arr[i])){
            if (typeof value == 'number'){
                if (!Number.isInteger(value)){
                    arr[i][key] = value.toFixed(2)
                }
            }
        }
        /*arr[i].power = arr[i].power.toFixed(2)
        if (typeof arr[i].discharge_time == 'number'){
            arr[i].discharge_time = arr[i].discharge_time.toFixed(2)
        }*/
        if(arr[i].was_calculated !== undefined){
            if(arr[i].was_calculated){ arr[i].was_calculated = 'Yes'} else { arr[i].was_calculated = 'No'}
        }

        if(arr[i].margin !== undefined){
            arr[i].margin = arr[i].margin.toString() + '%'
        }

        if(arr[i].discharge_time_start_life !== undefined && arr[i].discharge_time_start_life !== null){
            let h = Math.floor(arr[i].discharge_time_start_life / 60)
            let m = Math.floor(arr[i].discharge_time_start_life % 60)
            let s = Math.floor((arr[i].discharge_time_start_life % 1)*60)
            arr[i].discharge_time_start_life = `${h}:${m < 10 ? "0" + m : m}:${ s < 10 ? "0" + s : s}`
        }

        if(arr[i].discharge_time_end_life !== undefined && arr[i].discharge_time_end_life !== null){
            let h = Math.floor(arr[i].discharge_time_end_life / 60)
            let m = Math.floor(arr[i].discharge_time_end_life % 60)
            let s = Math.floor((arr[i].discharge_time_end_life % 1)*60)
            arr[i].discharge_time_end_life = `${h}:${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`
        }

        

        if(arr[i].price !== undefined){
            if (arr[i].price.price_min !== null){
                arr[i].price = Math.ceil(arr[i].price.price_min * currencies[arr[i].price.currency].equivalent / currencies[arr[i].price.currency].currency_amount * currencies[selectedCurrency.currency].currency_amount / currencies[selectedCurrency.currency].equivalent)
                arr[i].price = arr[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }else{
                arr[i].price = arr[i].price.alt_price
            }
        }
    }

    let column_classes = {'vendor': 'td-left', 'series': 'td-left','model': 'td-left', 'battery_id': 'hide-td'}

    return [arr, column_classes]
}


export default BatteryCalcValidation