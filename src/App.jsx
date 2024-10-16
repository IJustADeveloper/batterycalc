import { useState, useEffect } from 'react'
import './App.css'
import Form from './Form.jsx'
import Table from './Table.jsx'

function App() {

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

  const batTableNames = ['Вендор', 'Модель', 'Глубина разряда', 't автономии', 'Мощность', 't разряда', 'Мощность расcчитана?']

  return (
    <>
      <div className='flex-center'>
        <Form setBatteries={setBatteries} setColumnClasses={setColumnClasses} windowWidth={windowWidth}></Form>
      </div>
      <Table data={batteries} columnClasses={columnClasses} columnNames={batTableNames} windowWidth={windowWidth}></Table>

    </>
  )
}

export default App
