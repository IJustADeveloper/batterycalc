import { useState, useEffect } from 'react'

import Table from "../components/Table"
import Graph from "./Graph"
import Validation from '../Validation'

function Results({data, columnNames, columnSorts, selectedBatteryId, setSelectedBatteryId, checked, setChecked, selectedCurrency, currencies, headerNum=2, headerColor='maroon', dotOrAsymptotes=[null, null]}){
    const [displayedComponentNum, setDisplayedComponentNum] = useState(1);
    const [batteryData, setBatteryData] = useState(null);
    const [graphingData, setGraphingData] = useState(null);

    useEffect(()=>{
        let [bd, gd] = (data === null ? [null, null] : [data.data, data.graphing]);
        setBatteryData(bd !== undefined ? bd : null)
        setGraphingData(gd !== undefined ? gd : null)
    }, [data])
    
    return(
        <>
            <div className='battsize-results-container'>
                <div className='numbered-header'>
                    <div className={'number-box '+headerColor}>{headerNum}</div>
                    <p>Results:</p>
                    <div className='switcher'>
                        <div className={"option-container " + ( displayedComponentNum === 1 ? 'checked' : '')} onClick={()=>{setDisplayedComponentNum(1)}}>Table</div>
                        <div className={"option-container " + ( displayedComponentNum === 2 ? 'checked' : '')} onClick={()=>{setDisplayedComponentNum(2)}}>Graph</div>
                    </div>
                </div>
                <div className='results-content-container' 
                    style={{
                        visibility: displayedComponentNum === 1 ? 'visible' : 'hidden',
                        position: displayedComponentNum === 1 ? 'static' : 'absolute',
                    }}>
                    <Table data={batteryData} columnNames={columnNames} columnSorts={columnSorts} 
                    selectedBatteryId={selectedBatteryId} setSelectedBatteryId={setSelectedBatteryId} 
                    outerChecked={checked} outerSetChecked={setChecked} 
                    validationParams={[currencies, selectedCurrency]} validation={Validation} 
                    color={headerColor}/>
                </div>
                <div className='results-content-container' 
                    style={{
                        visibility: displayedComponentNum === 2 ? 'visible' : 'hidden',
                        position: displayedComponentNum === 2 ? 'static' : 'absolute', overflowY: 'hidden',
                    }}>
                    <Graph batteryData={batteryData} graphingData={graphingData} selectedTableColumnNames={columnNames} selectedTableColumnSorts={columnSorts}
                    selectedTableValidation={Validation} selectedTableValidationParams={[currencies, selectedCurrency]}
                    selectedBatteryId={selectedBatteryId} setSelectedBatteryId={setSelectedBatteryId}
                    checked={checked} setChecked={setChecked} 
                    color={headerColor}
                    dotOrAsymptotes={dotOrAsymptotes}/>
                </div>
            </div>
        </>
    )

}

/*
<div className='results-content-container' style={displayedComponentNum === 1 ? {} : {overflowY: 'hidden'}}>
                    { displayedComponentNum === 1 ? (
                        <Table data={batteryData} columnNames={columnNames} columnSorts={columnSorts} 
                        selectedBatteryId={selectedBatteryId} setSelectedBatteryId={setSelectedBatteryId} 
                        outerChecked={checked} outerSetChecked={setChecked} 
                        validationParams={[currencies, selectedCurrency]} validation={Validation} 
                        color={headerColor}/>
                    ) : null}
                    { displayedComponentNum === 2 ? (
                        <Graph data={batteryData} 
                        selectedBatteryId={selectedBatteryId} setSelectedBatteryId={setSelectedBatteryId}
                        checked={checked} setChecked={setChecked} 
                        color={headerColor}/>
                    ): null}
                </div>
*/

/*<div className='results-content-container' style={{display: (displayedComponentNum === 1 ? 'block' : 'none')}}>
                        <Table data={batteryData} columnNames={columnNames} columnSorts={columnSorts} 
                        selectedBatteryId={selectedBatteryId} setSelectedBatteryId={setSelectedBatteryId} 
                        outerChecked={checked} outerSetChecked={setChecked} 
                        validationParams={[currencies, selectedCurrency]} validation={Validation} 
                        color={headerColor}/>
                    </div>
                    <div className='results-content-container' style={{display: (displayedComponentNum === 2 ? 'block' : 'none'), overflowY: 'hidden'}}>
                        <Graph data={batteryData} 
                        selectedBatteryId={selectedBatteryId} setSelectedBatteryId={setSelectedBatteryId}
                        checked={checked} setChecked={setChecked} 
                        color={headerColor}/>
                    </div>*/

export default Results