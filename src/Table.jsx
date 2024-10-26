import {useState, useLayoutEffect, useRef} from 'react'

function Table({data, columnClasses={}, columnNames = null, windowWidth}){

    const tableDivRef = useRef()
    const tableRef = useRef()
    const [tableWidth, setTableWidth] = useState(0)

    useLayoutEffect(()=>{if (tableRef.current.clientWidth >= windowWidth){tableDivRef.current.className='horizontal-scroll'}else{tableDivRef.current.className=''}}, [data, windowWidth])

    if (data !== null){
        let arr = data.data

        let header
        let columns = []
        if (columnNames === null) {
            for (let key in arr[0]){
                columns.push(<th key={'column:'+key}>{key}</th>)
            }
        }else{
            for (let i=0; i<columnNames.length; i++){
                columns.push(<th onClick={(event)=>{console.log(columnNames[i])}} key={'column:'+columnNames[i]}>{columnNames[i]}</th>)
            }
        }
        header = [<tr className='table-header' key={'header'}>{columns}</tr>]

        let rows = []
        for (let i=0; i<arr.length; i++){
            let cells = []
            for (let key in arr[i]){
                let classname = "";
                if (columnClasses[key] !== undefined) {classname += " "+columnClasses[key]}
                cells.push(<td className={classname} key={i+":"+key}>{''+arr[i][key]}</td>)
            }
            rows.push(<tr key={i}>{cells}</tr>)
        }

        return (
            <>
            <div ref={tableDivRef}>
                <table ref={tableRef} className="table lined">
                    <thead>
                        {header}
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
            </>
            
        )
    }
    

    return (
        <>
        <div ref={tableDivRef}>
            <table ref={tableRef} className="table"> 
                <tbody>
                </tbody>
            </table>
        </div>
        </>
    )

    
}

export default Table