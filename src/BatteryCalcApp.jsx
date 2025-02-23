import { useState, useEffect } from 'react'
import './App.css'
import BatteryCalcForm from './BatteryCalcForm.jsx'
import Table from './Table.jsx'


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

  const [batteries, setBatteries] = useState(null);
  const [columnClasses, setColumnClasses] = useState(null);

  const batTableNames = ['Вендор', 'Модель', 'Мощность', 't разряда SOL', 't разряда EOL']

  return (
    <>
        <div className='flex-center'>
            <BatteryCalcForm setBatteries={setBatteries} setColumnClasses={setColumnClasses} windowWidth={windowWidth}></BatteryCalcForm>
        </div>
        <Table data={batteries} columnClasses={columnClasses} columnNames={batTableNames} windowWidth={windowWidth}></Table>
    </>
  )
}

export default BatteryCalcApp