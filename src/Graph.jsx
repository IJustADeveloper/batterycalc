import { useState, useEffect } from 'react'
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip } from 'recharts'
import './styles/graph.css'

import Table from './Table'

const colorsForColorClasses = {"maroon": "#B81668", "cyan": "#0076A4", "yellow": "#FEC909"};

function randomColorGen(){
    const chars = "0123456789ABCDEF"
    let colorCode = '#'
    for (let i=0; i<6; i++){
        colorCode += chars[Math.floor(Math.random() * 16)]
    }
    return colorCode
}

function genRandomColorsForIds(ids){
    let colorsForIds = {}
    for (let id of ids){
        colorsForIds[id] = randomColorGen()
    }
    return colorsForIds
}

function sortedIndex(array, value) {
    var low = 0,
        high = array.length;

    while (low < high) {
        var mid = (low + high) >>> 1;
        if (array[mid] < value) low = mid + 1;
        else high = mid;
    }
    return low;
}

function CubicHermiteSplineInterpolator(xValues, yValues, dydxValues, outputXValues, includeBasePoints){
    let outputXYPairs = []

    let previousIndex = 0
    outputXValues.forEach((outputX)=>{

        if (outputX < xValues[0] || outputX > xValues[xValues.length -1]) return;

        const rightPointIndex = sortedIndex(xValues, outputX);

        if (includeBasePoints){
            if (previousIndex !== rightPointIndex){
                for (previousIndex; previousIndex<=rightPointIndex-1; previousIndex++){
                    if(xValues[previousIndex] > outputXValues[0] && xValues[previousIndex] < outputXValues[outputXValues.length-1]){
                        outputXYPairs.push([xValues[previousIndex], yValues[previousIndex]]);
                    }
                }
            }
        }

        const h = xValues[rightPointIndex]-xValues[rightPointIndex - 1];
        const t = (outputX - xValues[rightPointIndex - 1])/(h);
        
        const h00 = 2*(t**3) - 3*(t**2) + 1;
        const h10 = t**3 - 2*(t**2) + t;
        const h01 = (-2)*(t**3) + 3*(t**2);
        const h11 = t**3 - t**2;

        const outputY = h00*yValues[rightPointIndex-1] + h10*h*dydxValues[rightPointIndex-1] + h01*yValues[rightPointIndex] + h11*h*dydxValues[rightPointIndex];

        outputXYPairs.push([outputX, outputY]);
    })

    if (includeBasePoints){
        if(xValues[xValues.length - 1] > outputXValues[0] && xValues[xValues.length - 1] < outputXValues[outputXValues.length-1]){
            outputXYPairs.push([xValues[xValues.length - 1], yValues[xValues.length - 1]]);
        }
    }
    
    return outputXYPairs;
}

function getCurves(graphingData, batteryIds, plotByBasePoints, domain, range, res=100){
    let outputXValues = []
    if (domain[1]-domain[0] === 0){outputXValues=[domain[0]]}
    else{
        for (let i=domain[0]; i <= domain[1]; i+=(domain[1]-domain[0])/res){
            outputXValues.push(i)
        }
    }

    let outputCurves = {}
    for (let id in graphingData){
        if (!batteryIds.includes(id)) continue;
         const gd = graphingData[id]

        if (plotByBasePoints){
            outputCurves[id] = gd.powers.map((power, index)=>{return {"power": power, "time": gd.times[index]}})
            continue;
        }
       
        let outputXYPairs = CubicHermiteSplineInterpolator(gd.powers, gd.times, gd.dydx, outputXValues, true)
        let finalizedPairs = outputXYPairs.reduce((fittedPairs, pair)=>{
            if (!(pair[1] < range[0] || pair[1] > range[1])) fittedPairs.push(pair);
            return fittedPairs;
        }, [])
        outputCurves[id] = finalizedPairs .map(([x, y])=>{return {"power": x, "time": y}})
    }

    return outputCurves
    
    return (Object.fromEntries(Object.entries(graphingData).map(([id, gd])=>{
        let outputXYPairs = CubicHermiteSplineInterpolator(gd.powers, gd.times, gd.dydx, outputXValues)
        return [id, outputXYPairs.map(([x, y])=>{return {"power": x, "time": y}})] 
        return [id, gd.powers.map((power, index)=>{return {"power": power, "time": gd.times[index]}})]
    })))
}

function Graph({batteryData, graphingData, selectedTableColumnNames, selectedTableColumnSorts, selectedTableValidation, selectedTableValidationParams, selectedBatteryId, setSelectedBatteryId, checked, setChecked, color='maroon'}){

    const [selectedTableData, setSelectedTableData] = useState(null);
    const [curves, setCurves] = useState({});
    const [colors, setColors] = useState({});

    const [domain, setDomain] = useState([0,1]);
    const [range, setRange] = useState([0,0]);

    const [showPoints, setShowPoints] = useState(false);
    const [plotByBasePoints, setPlotByBasePoints] = useState(false);

    function resize(e){
        e.preventDefault();
        const form = e.target;
        setDomain([parseFloat(form.xmin.value), parseFloat(form.xmax.value)]);
        setRange([parseFloat(form.ymin.value), parseFloat(form.ymax.value)]);
    }

    useEffect(()=>{
        if (graphingData !== null){
            const c = genRandomColorsForIds(Object.keys(graphingData));
            setColors(c);
        }
    }, [graphingData])

    useEffect(()=>{
        if (graphingData !== null){
            let batteryIds = Object.keys(checked)
            batteryIds.push(selectedBatteryId)
            setCurves(getCurves(graphingData, batteryIds, plotByBasePoints, domain, range))
        }
    }, [graphingData, checked, selectedBatteryId, plotByBasePoints, domain])

    useEffect(()=>{
        if (selectedBatteryId !== null && batteryData[selectedBatteryId] !== undefined){
            setSelectedTableData({[selectedBatteryId]: batteryData[selectedBatteryId]})
        }else{setSelectedTableData(null)}
    }, [selectedBatteryId])

    let listTableData = {}
    if (batteryData !== null){
        listTableData = Object.fromEntries(Object.entries(batteryData).map(([b_id, row], i)=>{
            return [b_id, {"batteryGraphListView": `${row.num_groups}x${row.num_batteries_in_group}x${row.model}`}]
        }))
    }   

    const listTableColumnNames = ["Solution"]
    const listTableColumnSorts = [null]

    return(
        <>
            <div className='graph-table-container'>
                <div className='graph-container'>
                    <LineChart width={540} height={400}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" label={{value: "Power", position: "insideBottom", offset: 0}} dataKey="power" domain={domain}/>
                        <YAxis type="number" label={{value: "Time", position: "insideLeft", offset: 22, angle: -90}} domain={range}/>
                        {Object.entries(curves).map(([id, curve])=>{
                            return (
                                <Line key={"batteryLineChart#"+id} isAnimationActive={false}
                                    stroke={id === selectedBatteryId? colorsForColorClasses[color] : colors[id]}
                                    strokeWidth={id === selectedBatteryId ? 2 : 1}
                                    dot={showPoints} data={curve} dataKey={"time"}
                                />
                            )
                        })}
                    </LineChart>
                    <div className='graph-controls-container'>
                        <form onSubmit={(e)=>{resize(e);}}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><label htmlFor='xmin'>x min:</label></td>
                                        <td><input className="number-input" type="number" id="xmin" step="0.01" ></input></td>
                                        <td><label htmlFor='xmax'>x max:</label></td>
                                        <td><input className="number-input" type="number" id="xmax" step="0.01" ></input></td>
                                        <td>
                                            <label htmlFor='pbbp'>plot by base points:</label>
                                            <input type="checkbox" id="pbbp" checked={plotByBasePoints} onChange={(e)=>{
                                                setPlotByBasePoints(e.target.checked);
                                            }}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label htmlFor='ymin'>y min:</label></td>
                                        <td><input className="number-input" type="number" id="ymin" step="0.01" ></input></td>
                                        <td><label htmlFor='ymax'>y max:</label></td>
                                        <td><input className="number-input" type="number" id="ymax" step="0.01" ></input></td>
                                        <td>
                                            <label htmlFor='sp'>show points:</label>
                                            <input type="checkbox" id="sp" checked={showPoints} onChange={(e)=>{
                                                setShowPoints(e.target.checked);
                                            }}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4}>
                                            <div className='button-container'>
                                                <button type="submit" style={{margin: 0, padding: "6px 15px"}} className='data-entry-submit-button'>
                                                    <div>update</div><img src='assets/calculate-button-icon.svg' width="18px" height="18px" alt='' />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
                <div className='graph-batt-list-table-container'>
                    <Table data={listTableData} columnNames={listTableColumnNames} columnSorts={listTableColumnSorts} 
                    selectedBatteryId={selectedBatteryId} setSelectedBatteryId={setSelectedBatteryId}
                    outerChecked={checked} outerSetChecked={setChecked}
                    validation={(ents)=>{return [ents, {'batteryGraphListView': 'td-left'}]}}
                    color={color}/>
                </div>
            </div>
            <div className='graph-selected-batt-table'>
                <Table data={selectedTableData} columnNames={selectedTableColumnNames} columnSorts={selectedTableColumnSorts}
                selectedBatteryId={selectedBatteryId} setSelectedBatteryId={setSelectedBatteryId}
                outerChecked={checked} outerSetChecked={setChecked}
                validationParams={selectedTableValidationParams}
                validation={selectedTableValidation}
                color={color}/>
            </div>
        </>
    )
}

export default Graph