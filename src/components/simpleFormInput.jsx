const simpleFormInput = (inputParams, inputId) => {
    return <input {...inputParams} id={inputId} name={inputId}/>
}

export default simpleFormInput