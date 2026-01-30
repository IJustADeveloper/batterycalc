import simpleFormInput from "./simpleFormInput";
import simpleFormSelect from "./simpleFormSelect";

const formFieldTemplates = {
	"input": simpleFormInput,
	"select": simpleFormSelect,
}

const Form = ({ formFieldsParams, calculatedFieldsParams, handleSubmit, handleChange, isSubmitting, headerNum = 1, headerColor = 'cyan' }) => {

	async function preHandleSubmit(event) {
		event.preventDefault();
		handleSubmit(event)
	}


	let formFields = formFieldsParams.map((params, i, a) => {
		return (
			<tr key={i}>
				<td className='td-left'><label htmlFor={params.id}>{params.label}</label></td>
				<td>{params.units !== '' && `[${params.units}]`}</td>
				<td>
					<div className='form-field-cell'>
						{params.fieldLabel && <label htmlFor={params.id}>{params.fieldLabel}</label>}
						{formFieldTemplates[params.fieldType](params.fieldParams, params.id)}
					</div>
				</td>
			</tr>
		)
	})

	let calculatedFields = calculatedFieldsParams.map((params, i, a) => {
		return (
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
						<div className={'number-box ' + headerColor}>{headerNum}</div>
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

					<button className='data-entry-submit-button' type='submit' name='submitButton' disabled={isSubmitting}  >
						<div>CALCULATE</div><img src='assets/calculate-button-icon.svg' alt='' />
					</button>
				</div>
			</form>

		</>
	)
}

export default Form
