const simpleFormSelect = ({options, onChange, ...selectParams}, selectId) => {
    
    const onFocus = (event) => {
        event.target.parentElement.style.zIndex = '1000'
        event.target.size = Math.min(5, options.length)
    }

    const onBlur = (event) => {
        event.target.parentElement.style.zIndex = 'auto'
        event.target.size = 1
    }

    const onChangeWrapper = (event) => {
        onChange(event)
        event.target.blur()
    }
    return (
        <div style={{position: 'relative'}}>
            <select {...selectParams} id={selectId} name={selectId} onFocus={onFocus} onBlur={onBlur} onChange={onChangeWrapper}>
                {options.map( (option, i) => {
                    return <option key={`${i}_option_${option}`} value={option}>{option}</option>
                })}
            </select>
        </div> 
    )
}

export default simpleFormSelect