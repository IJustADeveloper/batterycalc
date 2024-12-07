function SystemRuntimeEstimatorValidation(data){

    let arr = data.data

    for (let i=0; i<arr.length; i++){
        if (typeof arr[i].discharge_time_start_life == 'number'){
            arr[i].discharge_time_start_life = arr[i].discharge_time_start_life.toFixed(2)
        }
        if (typeof arr[i].discharge_time_end_life == 'number'){
            arr[i].discharge_time_end_life = arr[i].discharge_time_end_life.toFixed(2)
        }
    }
    data.data = arr

    let column_classes = {'vendor': 'td-left', 'series': 'td-left','model': 'td-left'}

    return [data, column_classes]
}


export default SystemRuntimeEstimatorValidation