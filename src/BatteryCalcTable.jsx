import {useState, useLayoutEffect, useRef} from 'react'

const batTableNames = ['Brand', 'Model', 'min BOL', 'min EOL', 'Q / string', 'Strings', 'Total', 'Margin']

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
        columns.push(<th onClick={()=>{applySort(i)}} key={'column:'+columnNames[i]}>{columnNames[i]}{sortConfig.key === i && (sortConfig.direction === 'ascending' ? ' ▲' : sortConfig.direction === 'descending' ? ' ▼' : '')}</th>)
    }

    header = [<tr className='table-header' key={'header'}>{columns}</tr>]


    let rows
    if (data !== null){
        let arr = data.data

        arr = sortData(structuredClone(arr))

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
            <div className='battsize-results-container'>
                <div className='numbered-header'>
                    <div className='number-box maroon'>2</div>
                    <p>Results:</p>
                </div>
                <div /*ref={tableDivRef}*/ className='battsize-table-container'>
                    <table /*ref={tableRef}*/ className="battsize-table">
                        <thead>
                            {header}
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
                <div className='battsize-warnings'>
                </div>
            </div>
        </>
    )

    
}

export default BatteryCalcTable