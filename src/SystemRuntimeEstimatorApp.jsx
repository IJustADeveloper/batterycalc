import { useState, useEffect } from 'react'
import './App.css'
import Table from './Table.jsx'
import SystemRuntimeEstimateForm from './SystemRuntimeEstimatorForm.jsx'

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

  const batTableNames = ['Вендор', 'Серия', 'Модель', 't разряда SOL', 't разряда EOL', 'Подходящие шкафы']

  return (
    <>  
        <div className='flex-center'>
            <SystemRuntimeEstimateForm setBatteries={setBatteries} setColumnClasses={setColumnClasses} windowWidth={windowWidth}></SystemRuntimeEstimateForm>
        </div>
        <Table data={batteries} columnClasses={columnClasses} columnNames={batTableNames} windowWidth={windowWidth}></Table>
    </>
  )
}

export default SystemRuntimeEstimatorApp