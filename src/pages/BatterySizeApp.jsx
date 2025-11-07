import { useState, useEffect } from 'react'

import Form from '../components/Form.jsx'
import Results from '../modules/Results.jsx'
import AdditionalInfoCard from '../modules/AdditionalInfoCard.jsx'
import Api from '../Api.jsx'
import {defaultSort, priceSort} from '../utils/Sorts.js'

import { getBatteryData, getCurrencies } from '../store/battSizeApp/battSizeGetData.js'
import { clearChecked, updateSelectedBatteryId } from '../store/battSizeApp/battSizeActionCreators.js'
import { useSelector, useDispatch} from 'react-redux'

import Validation from '../Validation'
import Table from '../modules/Table.jsx'
import Graph from '../modules/Graph.jsx'

import BattSizeResultsTable from '../modules/BattSizeResultsTable.jsx'
import BattSizeAddInfoCard from '../modules/BattSizeAddInfoCard.jsx'

function BatterySizeApp() {
  const dispatch = useDispatch()

  const currenciesStatus = useSelector(state => state.battSize.currenciesStatus)

  const formFieldsParams = [
	{id: 'power', label: 'S of load', units: 'kVA', inputParams: {className:'number-input', type:'number', step:'any', name:'power'}},
	{id: 'cos_fi', label: 'cos(fi) of load', units: '-', inputParams: {className:'number-input', type:'number', step:'0.01', max:'1', name:'cos_fi', defaultValue: 1}},
	{id: 'efficiency', label: 'Inverter efficiency', units: '%', inputParams: {className:'number-input', type:'number', max:'100', step:'any', name:'efficiency'}},
	{id: 'bElements', label: 'Q of batteries (12V)', units: 'pcs', inputParams: {className:'number-input', type:'number', step:'1', name:'bElements'}}, 
	{id: 'groups', label: 'Q of strings', units: 'pcs', inputParams: {className:'number-input', type:'number', step:'1', name:'groups', defaultValue: 1}}, 
	{id: 'dc_time', label: 'Time', units: 'min', inputParams: {className:'number-input', type:'number', step:'0.01', name:'dc_time'}}, 
	{id: 'depth', label: 'Depth of discharge', units: 'V/cell', inputParams: {className:'number-input', type:'number', step:'0.01', max:'2', name:'depth'}}, 
	{id: 'percent', label: 'Margin', units: '%', inputParams: {className:'number-input', type:'number', step:'any', name:'percent'}}
  ]
  
  const [calculatedFieldsParams, setCalculatedFieldsParams] = useState([
    {label: "P of load, kW", value: '\u2013'},
	{label: "P battery, W/cell", value: '\u2013'}
  ])

  async function handleSubmit(event){
  
	let form = event.target;
	let formData = {};
	let n = 0;
	while (form[n] !== undefined){
	  formData[form[n].name] = form[n].value;
	  n++;
	}

	formData.bElements *= 6
	delete formData.submitButton
	let powerW = formData.power * formData.cos_fi * 1000
	let power_el = powerW * 100 / (formData.groups * formData.bElements * formData.efficiency)
	formData.power_el = power_el


	let preCalcFields = [...calculatedFieldsParams];
	preCalcFields[0].value = powerW/1000; preCalcFields[1].value = power_el;
	setCalculatedFieldsParams(preCalcFields);

	dispatch(getBatteryData(formData))

	dispatch(clearChecked())
	dispatch(updateSelectedBatteryId(null))
	
  }

  useEffect(()=>{dispatch(getCurrencies())}, [])

  if (currenciesStatus === 'success'){
	
	return (
	  <>  
		  <div className='battsize-page-header'><p>Battery Size</p><img src='assets/battery-size-icon.svg' alt='' width='35px' height='33px' /></div>
		  <div className='battsize-page-container'>
			<Form formFieldsParams={formFieldsParams} calculatedFieldsParams={calculatedFieldsParams} handleSubmit={handleSubmit}/>
			<Results>
				<BattSizeResultsTable/>
				<h1>GRAPH</h1>
			</Results>
			<BattSizeAddInfoCard/>
		  </div>
	  </>
	)
  }
}


export default BatterySizeApp 