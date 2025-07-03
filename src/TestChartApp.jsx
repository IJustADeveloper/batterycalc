import { useState, useEffect } from 'react'
import './App.css'
import Api from './Api.jsx'
import LineChart from './Chart.jsx';


function TestChartApp(){
    const [chartData, setChartData] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    let api = new Api;

    useEffect(()=>{api.getTestChartData().then(result => {setChartData(result.data); setDataLoaded(true)})}, [])

    if (dataLoaded){
        return (
            <>
                <div className='chart-container'>
                    <LineChart height={"100%"} chartData={chartData}></LineChart>
                </div>
            </>
        );
    }
}

export default TestChartApp