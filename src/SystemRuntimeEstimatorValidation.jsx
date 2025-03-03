function SystemRuntimeEstimatorValidation(data){

    let arr = data

    for (let i=0; i<arr.length; i++){
        for (let [key, value] of Object.entries(arr[i])){
            if (typeof value == 'number'){
                if (!Number.isInteger(value)){
                    arr[i][key] = value.toFixed(2)
                }
            }
        }

        if(arr[i].discharge_time_start_life !== undefined && arr[i].discharge_time_start_life !== null){
            let h = Math.floor(arr[i].discharge_time_start_life / 60)
            let m = Math.floor(arr[i].discharge_time_start_life % 60)
            let s = Math.floor((arr[i].discharge_time_start_life % 1)*60)
            arr[i].discharge_time_start_life = `${h}:${ m < 10 ? "0" + m : m }:${ s < 10 ? "0" + s : s }`
        }

        if(arr[i].discharge_time_end_life !== undefined && arr[i].discharge_time_end_life !== null){
            let h = Math.floor(arr[i].discharge_time_end_life / 60)
            let m = Math.floor(arr[i].discharge_time_end_life % 60)
            let s = Math.floor((arr[i].discharge_time_end_life % 1)*60)
            arr[i].discharge_time_end_life = `${h}:${ m < 10 ? "0" + m : m }:${ s < 10 ? "0" + s : s }`
        }
    }

    let column_classes = {'vendor': 'td-left', 'series': 'td-left','model': 'td-left', 'cabinet': 'td-left', 'battery_id': 'hide-td'}

    return [arr, column_classes]
}


export default SystemRuntimeEstimatorValidation