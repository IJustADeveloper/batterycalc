function Validation(ents, currencies, selectedCurrency){
    let arr = JSON.parse(JSON.stringify(ents))
    arr = arr.map(([b_id, row])=>{

        for (let [key, value] of Object.entries(row)){
            if (typeof value == 'number'){
                if (!Number.isInteger(value)){
                    row[key] = value.toFixed(2)
                }
            }
        }

        if(row.was_calculated !== undefined){
            if(row.was_calculated){ row.was_calculated = 'Yes'} else { row.was_calculated = 'No'}
        }

        if(row.margin !== undefined){
            row.margin = row.margin.toString() + '%'
        }

        if(row.discharge_time_start_life !== undefined){
            if (row.discharge_time_start_life === null){row.discharge_time_start_life = '-'}
            else{
                let h = Math.floor(row.discharge_time_start_life / 60)
                let m = Math.floor(row.discharge_time_start_life % 60)
                let s = Math.floor((row.discharge_time_start_life % 1)*60)
                row.discharge_time_start_life = `${h}:${m < 10 ? "0" + m : m}:${ s < 10 ? "0" + s : s}`
            }
        }

        if(row.discharge_time_end_life !== undefined){
            if (row.discharge_time_end_life === null){row.discharge_time_end_life = '-'}
            else{
                let h = Math.floor(row.discharge_time_end_life / 60)
                let m = Math.floor(row.discharge_time_end_life % 60)
                let s = Math.floor((row.discharge_time_end_life % 1)*60)
                row.discharge_time_end_life = `${h}:${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`
            }
        }
        
        
        if(row.price !== undefined){
            if (row.price.price_min !== null){
                row.price = Math.ceil(row.price.price_min * currencies[row.price.currency].equivalent / currencies[row.price.currency].currency_amount * currencies[selectedCurrency.currency].currency_amount / currencies[selectedCurrency.currency].equivalent)
                row.price = row.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }else{
                row.price = row.price.alt_price
            }
        }

        return [b_id, row]
    })

    let column_classes = {'vendor': 'td-left', 'series': 'td-left','model': 'td-left', 'battery_id': 'hide-td'}

    return [arr, column_classes]
}


export default Validation