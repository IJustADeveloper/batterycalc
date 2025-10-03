import {useState, useEffect, useLayoutEffect, useRef} from 'react';

function Table({data, columnNames, columnSorts, selectedBatteryId, setSelectedBatteryId, outerChecked, outerSetChecked, validationParams=[], validation, color='maroon', checkboxColors=null}){

    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [checkboxSortConfig, setCheckboxSortConfig] = useState({direction: null});

    const [innerChecked, innerSetChecked] = useState({});

    const checked = outerChecked ?? innerChecked
    const setChecked = outerSetChecked ?? innerSetChecked

    const highlight = function(e){
        let tr = e.target.parentElement
        
        if (tr.tagName === 'TR'){
            let battery_id = tr.id

            let previousTr = document.getElementById(selectedBatteryId)
            if (previousTr){
                previousTr.className = ''
            }
            //tr.className = 'highlight ' + color
            
            if (battery_id !== selectedBatteryId){
                setSelectedBatteryId(battery_id)
            }else(setSelectedBatteryId(null))
        }   
        
    }

    /*useEffect(()=>{
        let tr = document.getElementById(selectedBatteryId)
        if (tr !== null){
            tr.className = 'highlight ' + color
        }
        
    }, [selectedBatteryId])*/

    const getNextSortDirection = (currentDirection) => {
        if (currentDirection === null) return 'ascending';
        if (currentDirection === 'ascending') return 'descending';
        return null;
    };

    const applySortChecked = function(){
        const direction = getNextSortDirection(checkboxSortConfig.direction);
        setCheckboxSortConfig({ direction });
    }

    const sortChecked = function(ents){
        if (checkboxSortConfig.direction === null) {return ents}

        ents.sort((a, b) => {
            let valA = checked[a[0]]
            let valB = checked[b[0]]
            if (valA === valB) {return 0}

            if (checkboxSortConfig.direction === 'ascending') {
                return valB === undefined ? 1 : -1;
            }
            if (checkboxSortConfig.direction === 'descending') {
                return valA === undefined ? 1 : -1;
            }
        })

        return ents
    }

    const applySort = function(key){
        const direction = key === sortConfig.key ? getNextSortDirection(sortConfig.direction) : 'ascending';
        setSortConfig({ key, direction });
    }

    const sortByColumn = function(ents){
        if (sortConfig.key !== undefined && sortConfig.key !== null && columnSorts[sortConfig.key] !== null){
            return columnSorts[sortConfig.key](ents, sortConfig.key, sortConfig.direction)
        }
        return ents
    }

    const columns = columnNames.map((columnName, i, a)=>{
        return(
            <th onClick={()=>{applySort(i)}} key={'column:'+columnName}>
                {columnName}
                {columnSorts[i] === null ? null : (<img style={{paddingLeft: '5px'}} src={sortConfig.key === i ? (sortConfig.direction === 'ascending' ? 'assets/sorting-arrows-up.svg' : sortConfig.direction === 'descending' ? 'assets/sorting-arrows-down.svg' : 'assets/sorting-arrows.svg') : 'assets/sorting-arrows.svg'} alt=''/>)}
            </th>
        )
    })

    columns.push(
        <th onClick={()=>{applySortChecked()}} key={'column:checkbox'}>
            <img src="assets/checkbox-icon.svg" alt='' width='15px' height='15px'/>
            <img style={{paddingLeft: '5px'}} src={checkboxSortConfig.direction === 'ascending' ? 'assets/sorting-arrows-up.svg' : checkboxSortConfig.direction === 'descending' ? 'assets/sorting-arrows-down.svg' : 'assets/sorting-arrows.svg'} alt=''/>
        </th>
    )
    
    let rows = []
    if (data !== null){
        let columnClasses = {};
        let ents = Object.entries(data);

        ents = sortByColumn(structuredClone(ents));
        ents = sortChecked(structuredClone(ents));

        [ents, columnClasses] = validation(ents, ...validationParams);

        rows = ents.map(([b_id, row], b_ind, b_a)=>{
            let cells = Object.entries(row).map(([key, param], p_ind, a)=>{
                let classname = ''
                if (columnClasses[key] !== undefined) {classname = columnClasses[key]}
                return(
                    <td className={classname} name={key} key={b_id+":"+key}>{ param }</td>
                )
            })

            cells.push(
                <td name={'checkbox'} key={b_id+':checkbox'} style={{backgroundColor: checkboxColors !== null && checkboxColors[b_id] !== undefined ? checkboxColors[b_id] : null}}><input onChange={(e) => {
                            if (e.target.checked){
                                setChecked({...checked, [b_id] : true})
                            }
                            else{
                                let preChecked = {...checked}
                                delete preChecked[b_id]
                                setChecked({...preChecked})
                            }
                        }
                    } checked={checked[b_id] === undefined ? false : true} type='checkbox'/>
                </td>
            )

            return(
                <tr className={b_id === selectedBatteryId ? 'highlight ' + color : ''} onClick={highlight} id={b_id} key={b_id}>{cells}</tr>
            )
        })
    }

    return(
        <>
            <table className="battsize-table">
                <thead>
                    <tr className='table-header'>{columns}</tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </>
    )

}

export default Table