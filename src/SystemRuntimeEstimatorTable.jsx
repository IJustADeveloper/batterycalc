import {useState, useLayoutEffect, useRef} from 'react'

const batTableNames = ['Brand', 'Model', 'min BOL', 'min EOL', 'Q / string', 'Strings', 'Total']

function BatteryCalcTable({data, columnClasses={}, /*columnNames = null,*/ windowWidth}){

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


    let rows

    if (data !== null){
        let arr = data.data

        rows = []
        for (let i=0; i<arr.length; i++){
            let cells = []
            for (let key in arr[i]){
                let classname = "";
                if (columnClasses[key] !== undefined) {classname += " "+columnClasses[key]}
                cells.push(<td className={classname} key={i+":"+key}>{''+arr[i][key]}</td>)
            }
            rows.push(<tr key={i}>{cells}</tr>)
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