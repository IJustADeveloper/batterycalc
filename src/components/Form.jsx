import {useState, useEffect} from 'react'

function Form({formFieldsParams, calculatedFieldsParams, handleSubmit, handleChange, headerNum=1, headerColor='cyan'}) {
  
  const [buttonDisabled, setButtonDisabled] = useState(false)

  async function preHandleSubmit(event){
    event.preventDefault();
    setButtonDisabled(true)
    await handleSubmit(event)
    setButtonDisabled(false)
  }

  let formFields = formFieldsParams.map((params, i, a)=>{
    return (
        <tr key={i}>
            <td className='td-left'><label htmlFor={params.id}>{params.label}</label></td>
            <td>[{params.units}]</td>
            <td><input {...params.inputParams} id={params.id}></input></td>
        </tr>
    )
  })

  let calculatedFields = calculatedFieldsParams.map((params, i, a)=>{
    return(
        <div key={i} className='data-entry-power'>
            <div>{params.label}</div>
            <div>{typeof params.value === 'number' ? params.value.toFixed(2) : params.value}</div>
        </div>
    )
  })

  return (
    <>
        <form onSubmit={preHandleSubmit} onChange={handleChange}>
          <div className='data-entry-container'>
            <div className='numbered-header'>
              <div className={'number-box '+headerColor}>{headerNum}</div>
              <p>Data Entry:</p>
            </div>
            <table className="data-entry-table">
              <tbody>
                {formFields}
              </tbody>
            </table>

            <div className='data-entry-power-container'>
              {calculatedFields}
            </div>

            <button className='data-entry-submit-button' type='submit' name='submitButton' disabled={buttonDisabled}  >
              <div>CALCULATE</div><img src='assets/calculate-button-icon.svg' alt='' />
            </button>
          </div>
        </form>
      
    </>
  )
}

export default Form
