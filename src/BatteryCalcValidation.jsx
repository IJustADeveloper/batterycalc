function BatteryCalcValidation(data){

    let arr = data.data

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
    }
    data.data = arr

    let column_classes = {'vendor': 'td-left', 'series': 'td-left','model': 'td-left', 'battery_id': 'hide-td'}

    return [data, column_classes]
}


export default BatteryCalcValidation