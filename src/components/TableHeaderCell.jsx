export default function TableHeaderCell(name, innerHTML=null, hasSort=false, applySort=null, ){
    return(
        <th onClick={()=>{applySort(i)}} key={'column:'+columnName}>
            {columnName}
            {columnSorts[i] === null ? null : (<img style={{paddingLeft: '5px'}} src={sortConfig.key === i ? (sortConfig.direction === 'ascending' ? 'assets/sorting-arrows-up.svg' : sortConfig.direction === 'descending' ? 'assets/sorting-arrows-down.svg' : 'assets/sorting-arrows.svg') : 'assets/sorting-arrows.svg'} alt=''/>)}
        </th>
    )
}