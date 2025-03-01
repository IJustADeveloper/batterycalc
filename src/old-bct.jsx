import {useState, useLayoutEffect, useRef} from 'react'

const batTableNames = ['Brand', 'Model', 'min BOL', 'min EOL', 'Q / string', 'Strings', 'Total', 'Margin']

function BatteryCalcTable({data, columnClasses={}, /*columnNames = null,*/ windowWidth, selectedBatteryId, setSelectedBatteryId}){

    /*const tableDivRef = useRef()
    const tableRef = useRef()
    const [tableWidth, setTableWidth] = useState(0)

    useLayoutEffect(()=>{if (tableRef.current.clientWidth >= windowWidth){tableDivRef.current.className='horizontal-scroll'}else{tableDivRef.current.className=''}}, [data, windowWidth])
    */

    let columnNames = batTableNames
    
    let header
    let columns = []
    for (let i=0; i<columnNames.length; i++){
        columns.push(<th onClick={(event)=>{console.log(columnNames[i])}} key={'column:'+columnNames[i]}>{columnNames[i]}</th>)
    }

    header = [<tr className='table-header' key={'header'}>{columns}</tr>]
    

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

    let rows
    if (data !== null){
        let arr = data.data

        rows = []
        for (let i=0; i<arr.length; i++){
            let cells = []
            for (let key in arr[i]){
                let classname = "";
                if (columnClasses[key] !== undefined) {classname += " "+columnClasses[key]}
                cells.push(<td className={classname} name={key} key={i+":"+key}>{''+arr[i][key]}</td>)
            }
            rows.push(<tr onClick={highlight} id={arr[i].battery_id} key={i}>{cells}</tr>)
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