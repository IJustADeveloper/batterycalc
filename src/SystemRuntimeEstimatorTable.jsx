import {useState, useLayoutEffect, useRef} from 'react'
import SystemRuntimeEstimatorValidation from './SystemRuntimeEstimatorValidation';

const batTableNames = ['Brand', 'Model', 'min BOL', 'min EOL', 'Q / string', 'Strings', 'Total']

function BatteryCalcTable({data, columnClasses={}, /*columnNames = null,*/ windowWidth, selectedBatteryId, setSelectedBatteryId}){

    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    let columnNames = batTableNames

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

    const applySort = function(key){
        const direction = key === sortConfig.key ? getNextSortDirection(sortConfig.direction) : 'ascending';
        setSortConfig({ key, direction });
    }

    const sortData = function(arr){
        if (sortConfig.direction === null) {return arr}

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

        return arr
    }
    
    let header
    let columns = []
    for (let i=0; i<columnNames.length; i++){
        columns.push(
            <th onClick={()=>{applySort(i)}} key={'column:'+columnNames[i]}>
                {columnNames[i]}
                <img style={{paddingLeft: '5px'}} src={sortConfig.key === i ? (sortConfig.direction === 'ascending' ? 'assets/sorting-arrows-up.svg' : sortConfig.direction === 'descending' ? 'assets/sorting-arrows-down.svg' : 'assets/sorting-arrows.svg') : 'assets/sorting-arrows.svg'} alt=''/>
            </th>
        )
    }

    header = [<tr className='table-header' key={'header'}>{columns}</tr>]


    let rows
    if (data !== null){
        let columnClasses
        let arr = data.data

        arr = sortData(structuredClone(arr))

        let res = SystemRuntimeEstimatorValidation(arr)
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

export default BatteryCalcTable