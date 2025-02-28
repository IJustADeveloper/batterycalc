import React from 'react'
import './App.css'
import BatteryCalcApp  from './BatteryCalcApp'
import SystemRuntimeEstimatorApp from './SystemRuntimeEstimatorApp'
import {Route, Routes, useNavigate} from 'react-router-dom'


function BattsizeNavbarItem({isChosen}){
  let item_classes = 'vert-navbar-item battsize'
  let svg_link = 'assets/battery-size-gray.svg'
  if (isChosen){
    item_classes += ' chosen'
    svg_link = 'assets/battery-size-color.svg'
  }

  const navigate = useNavigate()

  return (
    <>
      <div className={item_classes} onClick={() => navigate('/batterycalc/')}>
        <div className='vert-navbar-item-content-container'>
          <img src={svg_link} alt='' width='47' height='44' draggable={false}/>
          <p>Battery</p>
          <p>Size</p>
        </div>
      </div>
    </>
  )
}

function BatttimeNavbarItem({isChosen}){
  let item_classes = 'vert-navbar-item batttime'
  let svg_link = 'assets/battery-time-gray.svg'
  if (isChosen){
    item_classes += ' chosen'
    svg_link = 'assets/battery-time-color.svg'
  }

  const navigate = useNavigate()

  return(
    <>
      <div className={item_classes} onClick={() => navigate('/systemRuntimeEstimator/')}>
        <div className='vert-navbar-item-content-container'>
          <img src={svg_link} alt='' width='46' height='43' draggable={false}/>
          <p>Battery</p>
          <p>Time</p>
        </div>
      </div>
    </>
  )
}


function App() {

  return (
        <>
        <div className='after-root'>
          <div className='vert-navbar'>
            <Routes>
              <Route path='/batterycalc/' element={<BattsizeNavbarItem isChosen={true}/>}/>
              <Route path='/systemRuntimeEstimator/' element={<BattsizeNavbarItem isChosen={false}/>}/>
            </Routes>

            <Routes>
              <Route path='/batterycalc/' element={<BatttimeNavbarItem isChosen={false}/>}/>
              <Route path='/systemRuntimeEstimator/' element={<BatttimeNavbarItem isChosen={true}/>}/>
            </Routes>
          </div>
          <div className='page'>
            <Routes>
              <Route path='/batterycalc/' Component={BatteryCalcApp}/>
              <Route path='/systemRuntimeEstimator/' Component={SystemRuntimeEstimatorApp}/>
            </Routes>
          </div>
        </div>
        </>
  )
}

export default App

