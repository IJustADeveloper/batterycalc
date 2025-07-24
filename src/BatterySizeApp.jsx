import { useState, useEffect } from 'react'
import Form from './Form.jsx'
import Results from './Results.jsx'
import AdditionalInfoCard from './AdditionalInfoCard.jsx'
import Api from './Api.jsx'
import Sorts from './Sorts.jsx'


function BatterySizeApp() {
  let api = new Api;

  const [data, setData] = useState(null);

  const [selectedBatteryId, setSelectedBatteryId] = useState(null);

  const [currencies, setCurrencies] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [currenciesLoaded, setCurrenciesLoaded] = useState(false);

  const [checked, setChecked] = useState({});

  const [calcPower, setCalcPower] = useState(null);
  const [calcTime, setCalcTime] = useState(null);

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
    setCalcPower(power_el); setCalcTime(parseFloat(formData.dc_time));

    await api.calcBatteries(formData).then(result => { if (result === undefined){result = null}; setData(result);})

	  setChecked({});
    setSelectedBatteryId(null);

  }

  useEffect(()=>{api.getCurrencies().then(result => {setCurrencies(result.currencies); setSelectedCurrency(result.currencies[Object.keys(result.currencies)[0]]); setCurrenciesLoaded(true)})}, [])

  if (currenciesLoaded){
    const columnNames = ['Brand', 'Model', 't BOL', 't EOL', 'Q / string', 'Strings', 'Total', 'Margin', 'Sum '+selectedCurrency.currency];
    const columnSorts = [Sorts.defaultSort, Sorts.defaultSort, Sorts.defaultSort, Sorts.defaultSort, Sorts.defaultSort, Sorts.defaultSort, Sorts.defaultSort, Sorts.defaultSort, Sorts.priceSort]
    
    return (
      <>  
          <div className='battsize-page-header'><p>Battery Size</p><img src='assets/battery-size-icon.svg' alt='' width='35px' height='33px' /></div>
          <div className='battsize-page-container'>
            <Form formFieldsParams={formFieldsParams} calculatedFieldsParams={calculatedFieldsParams} handleSubmit={handleSubmit}/>
            <Results data={data} columnNames={columnNames} columnSorts={columnSorts} selectedBatteryId={selectedBatteryId} setSelectedBatteryId={setSelectedBatteryId} checked={checked} setChecked={setChecked} selectedCurrency={selectedCurrency} currencies={currencies} dotOrAsymptotes={[calcPower, calcTime]}/>
            <AdditionalInfoCard data={data} selectedBatteryId={selectedBatteryId} setSelectedCurrency={setSelectedCurrency} selectedCurrency={selectedCurrency} currencies={currencies}/>
          </div>
      </>
    )
  }
}

export default BatterySizeApp 