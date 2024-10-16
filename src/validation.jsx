function validation(data){

    let arr = data.data

    for (let i=0; i<arr.length; i++){
        arr[i].power = arr[i].power.toFixed(2)
        if (typeof arr[i].discharge_time == 'number'){
            arr[i].discharge_time = arr[i].discharge_time.toFixed(2)
        }
        if(arr[i].was_calculated){ arr[i].was_calculated = 'Да'} else { arr[i].was_calculated = 'Нет'}
    }
    data.data = arr

    let column_classes = {'vendor': 'td-left', 'series': 'td-left','model': 'td-left'}

    return [data, column_classes]
}


export default validation