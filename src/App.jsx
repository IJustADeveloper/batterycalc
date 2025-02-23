import './App.css'
import BatteryCalcApp  from './BatteryCalcApp'
import SystemRuntimeEstimatorApp from './SystemRuntimeEstimatorApp'
import {Route, Routes} from 'react-router-dom'


function App() {

  return (
        <>
        <Routes>
          <Route path='/batterycalc/' Component={BatteryCalcApp}/>
          <Route path='/systemRuntimeEstimator/' Component={SystemRuntimeEstimatorApp}/>
        </Routes>
        </>
  )
}

export default App

