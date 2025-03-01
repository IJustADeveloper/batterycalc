import { useState, useEffect } from 'react'
import './App.css'
import SystemRuntimeEstimateForm from './SystemRuntimeEstimatorForm.jsx'
import SystemRuntimeEstimateTable from './SystemRuntimeEstimatorTable.jsx'
import AdditionalInfoCard from './AdditionalInfoCard.jsx'


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

  const [data, setData] = useState(null);

  const [columnClasses, setColumnClasses] = useState(null);

  const [selectedBatteryId, setSelectedBatteryId] = useState(null);

  //const batTableNames = ['Вендор', 'Серия', 'Модель', 't разряда SOL', 't разряда EOL', 'Подходящие шкафы']

  return (
    <>  
      <div className='batttime-page-header'><p>Battery Time</p><img src='assets/battery-time-icon.svg' alt='' width='34px' height='32px' /></div>
      <div className='batttime-page-container'>
        <SystemRuntimeEstimateForm setData={setData} setColumnClasses={setColumnClasses} windowWidth={windowWidth}/>
        < SystemRuntimeEstimateTable data={data} columnClasses={columnClasses} /*columnNames={batTableNames}*/ windowWidth={windowWidth} selectedBatteryId={selectedBatteryId} setSelectedBatteryId={setSelectedBatteryId}/>
        <AdditionalInfoCard data={data} selectedBatteryId={selectedBatteryId}/>
      </div>
    </>
  )
}

export default SystemRuntimeEstimatorApp