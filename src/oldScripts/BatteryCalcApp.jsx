import { useState, useEffect } from 'react'
import './App.css'
import BatteryCalcForm from './BatteryCalcForm.jsx'
import BatteryCalcTable from './BatteryCalcTable.jsx'
import AdditionalInfoCard from './AdditionalInfoCard.jsx'
import Api from './Api.jsx'


function BatteryCalcApp() {

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

  useEffect(()=>{api.getCurrencies().then(result => {setCurrencies(result.currencies); setSelectedCurrency(result.currencies[Object.keys(result.currencies)[0]]); setCurrenciesLoaded(true)})}, [])
  
  //const batTableNames = ['Вендор', 'Модель', 'Мощность', 't разряда SOL', 't разряда EOL', 'Q батарей в группе', 'Q батарей всего']

  if (currenciesLoaded){
    return (
      <>  
          <div className='battsize-page-header'><p>Battery Size</p><img src='assets/battery-size-icon.svg' alt='' width='35px' height='33px' /></div>
          <div className='battsize-page-container'>
            <BatteryCalcForm setData={setData} setColumnClasses={setColumnClasses} windowWidth={windowWidth}/>
            <BatteryCalcTable data={data} columnClasses={columnClasses} /*columnNames={batTableNames}*/ selectedBatteryId={selectedBatteryId} setSelectedBatteryId={setSelectedBatteryId} selectedCurrency={selectedCurrency} currencies={currencies}/>
            <AdditionalInfoCard data={data} selectedBatteryId={selectedBatteryId} setSelectedCurrency={setSelectedCurrency} selectedCurrency={selectedCurrency} currencies={currencies}/>
          </div>
      </>
    )
  }
}

export default BatteryCalcApp