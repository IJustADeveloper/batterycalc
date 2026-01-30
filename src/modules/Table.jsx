import { useState } from 'react';
import { checkedSort, getNextSortDirection } from '../utils/Sorts';

function Table({data, columnNames, columnClasses, columnSorts, selectedRowId, setSelectedRowId, checked, setChecked, preSortFormat=(ents)=>ents, format=(ents)=>ents, color='maroon', checkboxColors=null}){

    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [checkboxSortConfig, setCheckboxSortConfig] = useState({direction: null});

    const highlight = function(e){
        let tr = e.target.parentElement
        
        if (tr.tagName === 'TR'){
            let row_id = tr.id
            setSelectedRowId(row_id)
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

        rows = ents.map(([r_id, row])=>{ // r_id = row id
            let cells = Object.entries(row).map(([key, param], p_ind, a)=>{
                let classname = ''
                if (columnClasses[key] !== undefined) {classname = columnClasses[key]}
                return(
                    <td className={classname} name={key} key={r_id+":"+key}>{ param }</td>
                )
            })

            cells.push(
                <td name={'checkbox'} key={r_id+':checkbox'} style={{backgroundColor: checkboxColors !== null && checkboxColors[r_id] !== undefined ? checkboxColors[r_id] : null}}>
                    <input onChange={() => {setChecked(r_id)}} checked={checked.has(r_id) ? true : false} type='checkbox'/>
                </td>
            )

            return(
                <tr className={r_id === selectedRowId ? 'highlight ' + color : ''} onClick={highlight} id={r_id} key={r_id }>{cells}</tr>
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