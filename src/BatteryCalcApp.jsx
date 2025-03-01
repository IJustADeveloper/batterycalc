import { useState, useEffect } from 'react'
import './App.css'
import BatteryCalcForm from './BatteryCalcForm.jsx'
import BatteryCalcTable from './BatteryCalcTable.jsx'
import AdditionalInfoCard from './AdditionalInfoCard.jsx'


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

  const [data, setData] = useState(null);

  const [columnClasses, setColumnClasses] = useState(null);

  const [selectedBatteryId, setSelectedBatteryId] = useState(null);
  
  //const batTableNames = ['Вендор', 'Модель', 'Мощность', 't разряда SOL', 't разряда EOL', 'Q батарей в группе', 'Q батарей всего']

  return (
    <>  
        <div className='battsize-page-header'><p>Battery Size</p><img src='assets/battery-size-icon.svg' alt='' width='35px' height='33px' /></div>
        <div className='battsize-page-container'>
          <BatteryCalcForm setData={setData} setColumnClasses={setColumnClasses} windowWidth={windowWidth}/>
          <BatteryCalcTable data={data} columnClasses={columnClasses} /*columnNames={batTableNames}*/ windowWidth={windowWidth} selectedBatteryId={selectedBatteryId} setSelectedBatteryId={setSelectedBatteryId}/>
          <AdditionalInfoCard data={data} selectedBatteryId={selectedBatteryId}/>
        </div>
    </>
  )
}

export default BatteryCalcApp