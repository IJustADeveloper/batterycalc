import { useState, useEffect } from 'react'
import './App.css'
import SystemRuntimeEstimateForm from './SystemRuntimeEstimatorForm.jsx'
import SystemRuntimeEstimateTable from './SystemRuntimeEstimatorTable.jsx'
import AdditionalInfoCard from '../AdditionalInfoCard.jsx'
import Api from '../Api.jsx'


function SystemRuntimeEstimatorApp() {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let api = new Api;

  const [data, setData] = useState(null);

  const [columnClasses, setColumnClasses] = useState(null);

  const [selectedBatteryId, setSelectedBatteryId] = useState(null);

  const [currencies, setCurrencies] = useState(null)
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [currenciesLoaded, setCurrenciesLoaded] = useState(false);

  //const batTableNames = ['Вендор', 'Серия', 'Модель', 't разряда SOL', 't разряда EOL', 'Подходящие шкафы']

  useEffect(()=>{api.getCurrencies().then(result => {setCurrencies(result.currencies); setSelectedCurrency(result.currencies[Object.keys(result.currencies)[0]]); setCurrenciesLoaded(true)})}, [])
  
  if (currenciesLoaded){
    return (
      <>  
        <div className='batttime-page-header'><p>Battery Time</p><img src='assets/battery-time-icon.svg' alt='' width='34px' height='32px' /></div>
        <div className='batttime-page-container'>
          <SystemRuntimeEstimateForm setData={setData} setColumnClasses={setColumnClasses} windowWidth={windowWidth}/>
          <SystemRuntimeEstimateTable data={data} columnClasses={columnClasses} /*columnNames={batTableNames}*/ windowWidth={windowWidth} selectedBatteryId={selectedBatteryId} setSelectedBatteryId={setSelectedBatteryId} selectedCurrency={selectedCurrency} currencies={currencies}/>
          <AdditionalInfoCard data={data} selectedBatteryId={selectedBatteryId} setSelectedCurrency={setSelectedCurrency} selectedCurrency={selectedCurrency} currencies={currencies}/>
        </div>
      </>
    )
  }
}

export default SystemRuntimeEstimatorApp