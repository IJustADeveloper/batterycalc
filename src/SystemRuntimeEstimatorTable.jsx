import {useState, useLayoutEffect, useRef} from 'react'
import SystemRuntimeEstimatorValidation from './SystemRuntimeEstimatorValidation';

const batTableNames = ['Brand', 'Model', 't BOL', 't EOL', 'Q / string', 'Strings', 'Total', 'Sum']

function SystemRuntimeEstimatorTable({data, columnClasses={}, /*columnNames = null,*/ windowWidth, selectedBatteryId, setSelectedBatteryId, selectedCurrency, currencies}){

    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [checkboxSortConfig, setCheckboxSortConfig] = useState({direction: null});
    const [checked, setChecked] = useState({});

    let columnNames = Array.from(batTableNames);

    const getNextSortDirection = (currentDirection) => {
        if (currentDirection === null) return 'ascending';
        if (currentDirection === 'ascending') return 'descending';
        return null;
    };

    const highlight = function(e){
        let tr = e.target.parentElement
        let battery_id = tr.id
        
        if (battery_id !== selectedBatteryId){
            
            let previousTr = document.getElementById(selectedBatteryId)
            if (previousTr){
                previousTr.className = ''
            }
            tr.className = 'highlight'
            setSelectedBatteryId(battery_id)
        }
        
    }

    const applySortChecked = function(){
        const direction = getNextSortDirection(checkboxSortConfig.direction);
        setCheckboxSortConfig({ direction });
    }

    const sortChecked = function(arr){
        if (checkboxSortConfig.direction === null) {return arr}

        arr.sort((a, b) => {
            let valA = checked[a.battery_id]
            let valB = checked[b.battery_id]
            if (valA === valB) {return 0}

            if (checkboxSortConfig.direction === 'ascending') {
                return valB === undefined ? 1 : -1;
            }
            if (checkboxSortConfig.direction === 'descending') {
                return valA === undefined ? 1 : -1;
            }
        })

        return arr
    }

    const applySort = function(key){
        console.log('sort-checked')
        const direction = key === sortConfig.key ? getNextSortDirection(sortConfig.direction) : 'ascending';
        setSortConfig({ key, direction });
    }

    const sortData = function(arr){
        if (sortConfig.direction === null) {return arr}

        //console.log(sortConfig.key, Object.keys(arr[0]).length-1, arr[0])
        console.log(sortConfig.key)
        if (sortConfig.key === 7){
            arr.sort((a, b)=>{
                let valA = a[Object.keys(a)[sortConfig.key]];
                let valB = b[Object.keys(a)[sortConfig.key]];
                
                if (valA.price_min !== valB.price_min){
                    if (valA.price_min === null) return 1
                    if (valB.price_min === null) return -1

                    if (sortConfig.direction === 'ascending') {
                        return valA.price_min > valB.price_min ? 1 : -1;
                    }
                    if (sortConfig.direction === 'descending') {
                        return valA.price_min < valB.price_min ? 1 : -1;
                    }
                }
                else if(valA.price_min === null){
                    if (valA.alt_price != valB.alt_price){
                        if (valA.alt_price === 'n/a') return 1
                        if (valB.alt_price === 'n/a') return -1

                        if (sortConfig.direction === 'ascending') {
                            return valA.alt_price > valB.alt_price ? 1 : -1;
                        }
                        if (sortConfig.direction === 'descending') {
                            return valA.alt_price < valB.alt_price ? 1 : -1;
                        }
                    }
                    return 0
                }else{
                    return 0
                }

            })
        }
        else{
            arr.sort((a, b)=>{
                let valA = a[Object.keys(a)[sortConfig.key]];
                let valB = b[Object.keys(a)[sortConfig.key]];

                if (!isNaN(parseFloat(valA))){
                    valA = parseFloat(valA)
                }
                if (!isNaN(parseFloat(valB))){
                    valB = parseFloat(valB)
                }

                if (valA === valB) return 0;

                if (sortConfig.direction === 'ascending') {
                    return valA > valB ? 1 : -1;
                }
                if (sortConfig.direction === 'descending') {
                    return valA < valB ? 1 : -1;
                }
                return 0;
            })
        }
        return arr
    }
    
    let header
    let columns = []
    for (let i=0; i<columnNames.length; i++){
        if (columnNames[i] == 'Sum'){
            columns.push(
                <th onClick={()=>{applySort(i)}} key={'column:'+columnNames[i]}>
                    {columnNames[i] + ' ' + selectedCurrency.currency}
                    <img style={{paddingLeft: '5px'}} src={sortConfig.key === i ? (sortConfig.direction === 'ascending' ? 'assets/sorting-arrows-up.svg' : sortConfig.direction === 'descending' ? 'assets/sorting-arrows-down.svg' : 'assets/sorting-arrows.svg') : 'assets/sorting-arrows.svg'} alt=''/>
                </th>
            )
        }
        else{
            columns.push(
                <th onClick={()=>{applySort(i)}} key={'column:'+columnNames[i]}>
                    {columnNames[i]}
                    <img style={{paddingLeft: '5px'}} src={sortConfig.key === i ? (sortConfig.direction === 'ascending' ? 'assets/sorting-arrows-up.svg' : sortConfig.direction === 'descending' ? 'assets/sorting-arrows-down.svg' : 'assets/sorting-arrows.svg') : 'assets/sorting-arrows.svg'} alt=''/>
                </th>
            )
        }
    } 

    columns.push(
        <th onClick={()=>{applySortChecked()}} key={'column:checkbox'}>
            <img src="assets/checkbox-icon.svg" alt='' width='15px' height='15px'/>
            <img style={{paddingLeft: '5px'}} src={checkboxSortConfig.direction === 'ascending' ? 'assets/sorting-arrows-up.svg' : checkboxSortConfig.direction === 'descending' ? 'assets/sorting-arrows-down.svg' : 'assets/sorting-arrows.svg'} alt=''/>
        </th>
    )

    header = [<tr className='table-header' key={'header'}>{columns}</tr>]


    let rows
    if (data !== null){
        let columnClasses
        let arr = Object.values(data.data)

        arr = sortData(structuredClone(arr))

        arr = sortChecked(structuredClone(arr))

        let res = SystemRuntimeEstimatorValidation(arr, currencies, selectedCurrency)
        arr = res[0]
        columnClasses = res[1]

        rows = []
        for (let i=0; i<arr.length; i++){
            let cells = []
            for (let key in arr[i]){
                let classname = "";
                if (columnClasses[key] !== undefined) {classname += " "+columnClasses[key]}
                cells.push(<td className={classname} name={key} key={i+":"+key}>{''+arr[i][key]}</td>)
            }

            cells.push(<td name={'checkbox'} key={i+':checkbox'}><input onChange={(e) => {
                    if (e.target.checked){
                        setChecked({...checked, [arr[i].battery_id] : true})
                    }
                    else{
                        let preChecked = {...checked}
                        delete preChecked[arr[i].battery_id]
                        setChecked({...preChecked})
                    }
                }
            } checked={checked[arr[i].battery_id] === undefined ? false : true} type='checkbox'/></td>)

            rows.push(<tr onClick={highlight} id={arr[i].battery_id} key={arr[i].battery_id}>{cells}</tr>)
        }

    }
    

    return (
        <>
            <div className='batttime-results-container'>
                <div className='numbered-header'>
                    <div className='number-box cyan'>3</div>
                    <p>Results:</p>
                </div>
                <div /*ref={tableDivRef}*/ className='batttime-table-container'>
                    <table /*ref={tableRef}*/ className="batttime-table">
                        <thead>
                            {header}
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
                <div className='batttime-warnings'>
                </div>
            </div>
        </>
    )

    
}

export default SystemRuntimeEstimatorTable