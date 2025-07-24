import { useState, useEffect } from 'react'
import AdditionalInfoCard from './AdditionalInfoCard.jsx'
import Api from './Api.jsx'
import Sorts from './Sorts.jsx'

import BatteryChoiceForm from './BatteryChoiceForm.jsx'
import Form from './Form.jsx'
import Results from './Results.jsx'


function BatteryTimeApp(){
    let api = new Api;

    const [data, setData] = useState(null);

    const [selectedBatteryId, setSelectedBatteryId] = useState(null);

    const [currencies, setCurrencies] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const [currenciesLoaded, setCurrenciesLoaded] = useState(false);

    const [checked, setChecked] = useState({});

    const [names, setNames] = useState(null);
    const [namesLoaded, setNamesLoaded] = useState(false);

    const [pickedNames, setPickedNames] = useState({});

    const [calcPower, setCalcPower] = useState(null);

    const formFieldsParams = [
        {id: 'powerS', label: 'S of load', units: 'kVA', inputParams: {className:'number-input', type:'number', step:'any', name:'powerS'}},
        {id: 'cos_fi', label: 'cos(fi) of load', units: '-', inputParams: {className:'number-input', type:'number', step:'0.01', max:'1', name:'cos_fi', defaultValue: 1}},
        {id: 'powerP', label: 'P of load', units: 'kW', inputParams: {className:'number-input', type:'number', step:'any', name:'powerP'}},
        {id: 'efficiency', label: 'Inverter efficiency', units: '%', inputParams: {className:'number-input', type:'number', max:'100', step:'any', name:'efficiency'}},
        {id: 'bElements', label: 'Q of batteries (12V)', units: 'pcs', inputParams: {className:'number-input', type:'number', step:'1', name:'bElements'}}, 
        {id: 'groups', label: 'Q of strings', units: 'pcs', inputParams: {className:'number-input', type:'number', step:'1', name:'groups', defaultValue: 1}}, 
        {id: 'depth', label: 'Depth of discharge', units: 'V/cell', inputParams: {className:'number-input', type:'number', step:'0.01', max:'2', name:'depth'}}, 
    ]

    const [calculatedFieldsParams, setCalculatedFieldsParams] = useState([
        {label: "P battery, W/cell", value: '\u2013'}
    ])

    function handleChangeForm(event){
        let formInput = event.target
        let form = formInput.form

        if (formInput.id === 'powerS'){
            form.elements.powerP.value = formInput.value * form.elements.cos_fi.value
        }
        else if(formInput.id === 'cos_fi'){
            form.elements.powerP.value = formInput.value * form.elements.powerS.value
        }
        else if(formInput.id === 'powerP'){
            if (formInput.value / form.elements.powerS.value > 1){
                form.elements.cos_fi.value = 1
                form.elements.powerS.value = formInput.value
            }
            else{
                form.elements.cos_fi.value = formInput.value / form.elements.powerS.value
            }
        }
    }

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
        let powerW = formData.powerP * 1000
        formData.power_el = powerW * 100 / (formData.groups * formData.bElements * formData.efficiency)
        formData.names = JSON.parse(JSON.stringify(pickedNames))

        let preCalcFields = [...calculatedFieldsParams];
        preCalcFields[0].value = formData.power_el;
        setCalculatedFieldsParams(preCalcFields);
        setCalcPower(power_el);

        setChecked({});

        await api.systemRuntimeEstimate(formData).then(result => { if (result === undefined){result = null}; setData(result);})
    }


    useEffect(()=>{api.getCurrencies().then(result => {setCurrencies(result.currencies); setSelectedCurrency(result.currencies[Object.keys(result.currencies)[0]]); setCurrenciesLoaded(true)})}, [])
    useEffect(()=>{api.getNames().then(result => {setNames(result.data); setNamesLoaded(true);})}, []);

    
    if (currenciesLoaded && namesLoaded){
        const columnNames = ['Brand', 'Model', 't BOL', 't EOL', 'Q / string', 'Strings', 'Total', 'Sum '+selectedCurrency.currency];
        const columnSorts = [Sorts.defaultSort, Sorts.defaultSort, Sorts.defaultSort, Sorts.defaultSort, Sorts.defaultSort, Sorts.defaultSort, Sorts.defaultSort, Sorts.priceSort]
        return (
            <>  
            <div className='batttime-page-header'><p>Battery Time</p><img src='assets/battery-time-icon.svg' alt='' width='34px' height='32px' /></div>
            <div className='batttime-page-container'>
                <div>
                    <BatteryChoiceForm names={names} pickedNames={pickedNames} setPickedNames={setPickedNames} />
                    <Form formFieldsParams={formFieldsParams} calculatedFieldsParams={calculatedFieldsParams} handleSubmit={handleSubmit} handleChange={handleChangeForm} headerNum={2} headerColor='yellow'/>
                </div>
                <Results data={data} columnNames={columnNames} columnSorts={columnSorts} selectedBatteryId={selectedBatteryId} setSelectedBatteryId={setSelectedBatteryId} checked={checked} setChecked={setChecked} selectedCurrency={selectedCurrency} currencies={currencies} headerNum={3} headerColor='cyan' dotOrAsymptotes={[calcPower, null]}/>
                <AdditionalInfoCard data={data} selectedBatteryId={selectedBatteryId} setSelectedCurrency={setSelectedCurrency} selectedCurrency={selectedCurrency} currencies={currencies} headerColor='cyan'/>
            </div>
            </>
        )
    }
}

export default BatteryTimeApp