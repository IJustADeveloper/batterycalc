import { useState, useEffect } from 'react'
import './App.css'
import SystemRuntimeEstimateForm from './SystemRuntimeEstimatorForm.jsx'
import SystemRuntimeEstimateTable from './SystemRuntimeEstimatorTable.jsx'

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

  const [batteries, setBatteries] = useState(null);
  const [columnClasses, setColumnClasses] = useState(null);

  //const batTableNames = ['Вендор', 'Серия', 'Модель', 't разряда SOL', 't разряда EOL', 'Подходящие шкафы']

  return (
    <>  
      <div className='batttime-page-header'><p>Battery Time</p><img src='assets/battery-time-icon.svg' alt='' width='34px' height='32px' /></div>
      <div className='batttime-page-container'>
        <SystemRuntimeEstimateForm setBatteries={setBatteries} setColumnClasses={setColumnClasses} windowWidth={windowWidth}/>
        < SystemRuntimeEstimateTable data={batteries} columnClasses={columnClasses} /*columnNames={batTableNames}*/ windowWidth={windowWidth}/>
      </div>
    </>
  )
}

export default SystemRuntimeEstimatorApp