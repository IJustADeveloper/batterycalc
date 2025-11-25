import { useState } from 'react';
import { checkedSort, getNextSortDirection } from '../utils/Sorts';

function Table({data, columnNames, columnClasses, columnSorts, selectedBatteryId, setSelectedBatteryId, checked, setChecked, preSortFormat=(ents)=>ents, format=(ents)=>ents, color='maroon', checkboxColors=null}){

    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [checkboxSortConfig, setCheckboxSortConfig] = useState({direction: null});

    const highlight = function(e){
        let tr = e.target.parentElement
        
        if (tr.tagName === 'TR'){
            let battery_id = tr.id

            if (battery_id !== selectedBatteryId){
                setSelectedBatteryId(battery_id)
            }else(setSelectedBatteryId(null))
        }   
    }

    const applySortChecked = function(){
        const direction = getNextSortDirection(checkboxSortConfig.direction);
        setCheckboxSortConfig({ direction });
    }

    const applySort = function(key){
        const direction = key === sortConfig.key ? getNextSortDirection(sortConfig.direction) : getNextSortDirection(null);
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
        let ents = Object.entries(data);

        ents = preSortFormat(ents)

        ents = sortByColumn(structuredClone(ents));
        ents = checkedSort(structuredClone(ents), checkboxSortConfig.direction, checked);

        ents = format(ents);

        rows = ents.map(([b_id, row], b_ind, b_a)=>{
            let cells = Object.entries(row).map(([key, param], p_ind, a)=>{
                let classname = ''
                if (columnClasses[key] !== undefined) {classname = columnClasses[key]}
                return(
                    <td className={classname} name={key} key={b_id+":"+key}>{ param }</td>
                )
            })

            cells.push(
                <td name={'checkbox'} key={b_id+':checkbox'} style={{backgroundColor: checkboxColors !== null && checkboxColors[b_id] !== undefined ? checkboxColors[b_id] : null}}>
                    <input onChange={() => {setChecked(b_id)}} checked={checked.has(b_id) ? true : false} type='checkbox'/>
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