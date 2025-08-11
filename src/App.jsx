import React from 'react'
import './styles/App.css'

import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'


import BatterySizeApp from './BatterySizeApp'
import BatteryTimeApp from './BatteryTimeApp'
import UPSTimeApp from './UPSTimeApp'


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
      <div className={item_classes} onClick={() => navigate('/batterysize/')}>
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
      <div className={item_classes} onClick={() => navigate('/batterytime/')}>
        <div className='vert-navbar-item-content-container'>
          <img src={svg_link} alt='' width='46' height='43' draggable={false}/>
          <p>Battery</p>
          <p>Time</p>
        </div>
      </div>
    </>
  )
}

function UPStimeNavbarItem({isChosen}){
  let item_classes = 'vert-navbar-item upstime'
  let svg_link = 'assets/battery-time-gray.svg'
  if (isChosen){
    item_classes += ' chosen'
    svg_link = 'assets/battery-time-color.svg'
  }

  const navigate = useNavigate()

  return(
    <>
      <div className={item_classes} onClick={() => navigate('/batterytime/')}>
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

  const location = useLocation()

  return (
        <>
        <div className='after-root'>
          <div className='vert-navbar'>
            <BattsizeNavbarItem isChosen={location.pathname === "/batterysize/"}/>
            <BatttimeNavbarItem isChosen={location.pathname === "/batterytime/"}/>
          </div>
          <div className='page'>
            <Routes>
              <Route path='/batterysize/' Component={BatterySizeApp}/>
              <Route path='/batterytime/' Component={BatteryTimeApp}/>
            </Routes>
          </div>
        </div>
        </>
  )
}

export default App

