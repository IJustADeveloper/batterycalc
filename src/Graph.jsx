import { useState, useEffect } from 'react'
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, ResponsiveContainer, Dot} from 'recharts'
import './styles/graph.css'

import Table from './Table'

const colorsForColorClasses = {"maroon": "#B81668", "cyan": "#0076A4", "yellow": "#FEC909"};

// these two functions get maximum/minimum value for an array inside an object inside an object. ex: {<id>: {<key>: [...]}...}
function getMaxForObjectKey(obj, key){
    return Math.max(...Object.entries(obj).map(([id, innerObj])=>{
        return Math.max(...innerObj[key])
    }));
}

function getMinForObjectKey(obj, key){
    return Math.min(...Object.entries(obj).map(([id, innerObj])=>{
        return Math.min(...innerObj[key])
    }));
}

// checks if a number (n) is inside a range (range in form of [firstNum, secondNum]), also if either firstNum or secondNum is null, it will be treated as there is no boundary 
function isInRange(n, range){
    let left = (isNaN(range[0]) || range[0] === null ? true : n >= range[0]);
    let right = (isNaN(range[1]) || range[1] === null ? true : n <= range[1]);
    return (left && right);
}

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

function validateBoundaries(domain, range){
    let res = [true, true]
    if (domain[0] === null || domain[1] === null || domain[0] >= domain[1]) res[0] = false;
    if (range[0] === null || range[1] === null || range[0] >= range[1]) res[1] = false;
    return res
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
                    if(xValues[previousIndex] >= outputXValues[0] && xValues[previousIndex] <= outputXValues[outputXValues.length-1]){
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
        if(xValues[xValues.length - 1] >= outputXValues[0] && xValues[xValues.length - 1] <= outputXValues[outputXValues.length-1]){
            outputXYPairs.push([xValues[xValues.length - 1], yValues[xValues.length - 1]]);
        }
    }
    
    return outputXYPairs;
}

function getCurves(graphingData, batteryIds, plotByBasePoints, domain, range, res=100){
    let outputXValues = []

    let innerDomain = [...domain]
    if (innerDomain[0] === null){innerDomain[0] = getMinForObjectKey(graphingData, "powers")}
    if (innerDomain[1] === null){innerDomain[1] = getMaxForObjectKey(graphingData, "powers")}

    let innerRange = [...range]
    if (innerRange[0] === null){innerRange[0] = getMinForObjectKey(graphingData, "times")}
    if (innerRange[1] === null){innerRange[1] = getMaxForObjectKey(graphingData, "times")}

    if (innerDomain[0] === innerDomain[1]){outputXValues=[innerDomain[0]]}
    else{
        for (let i=innerDomain[0]; i <= innerDomain[1]; i+=(innerDomain[1]-innerDomain[0])/res){
            outputXValues.push(i)
        }
    }

    let outputCurves = {}
    for (let id in graphingData){
        if (!batteryIds.includes(id)) continue;
         const gd = graphingData[id]

        if (plotByBasePoints){
            let preOutputCurve = gd.powers.map((power, index)=>{return {"power": power, "time": gd.times[index]}});
            outputCurves[id] = preOutputCurve.reduce((finalizedCurve, pair)=>{
                if (isInRange(pair["power"], innerDomain) && isInRange(pair["time"], innerRange)){
                    finalizedCurve.push(pair)
                }
                return finalizedCurve
            }, [])
            continue;
        }
       
        let outputXYPairs = CubicHermiteSplineInterpolator(gd.powers, gd.times, gd.dydx, outputXValues, true)
        let finalizedPairs = outputXYPairs.reduce((fittedPairs, pair)=>{
            if (!(pair[1] < innerRange[0] || pair[1] > innerRange[1])) fittedPairs.push(pair);
            return fittedPairs;
        }, [])
        outputCurves[id] = finalizedPairs .map(([x, y])=>{return {"power": x, "time": y}})
    }

    return outputCurves
}

function Graph({batteryData, graphingData, selectedTableColumnNames, selectedTableColumnSorts, selectedTableValidation, selectedTableValidationParams, selectedBatteryId, setSelectedBatteryId, checked, setChecked, color='maroon', dotOrAsymptotes=[null, null]}){

    const [selectedTableData, setSelectedTableData] = useState(null);
    const [curves, setCurves] = useState({});
    const [colors, setColors] = useState({});

    const [domain, setDomain] = useState([null, null]);
    const [range, setRange] = useState([null, null]);

    const [showPoints, setShowPoints] = useState(false);
    const [plotByBasePoints, setPlotByBasePoints] = useState(false);

    useEffect(()=>{
        if (graphingData !== null){
            const c = genRandomColorsForIds(Object.keys(graphingData));
            setColors(c);

            const maxPower = getMaxForObjectKey(graphingData, "powers")
            const maxTime = getMaxForObjectKey(graphingData, "times")

            setDomain([0, maxPower]);
            setRange([0, maxTime]);
        }
    }, [graphingData])

    useEffect(()=>{
        let areBoundariesValid = validateBoundaries(domain, range);
        if (graphingData !== null && areBoundariesValid[0] && areBoundariesValid[0]){
            let batteryIds = Object.keys(checked)
            batteryIds.push(selectedBatteryId)
            setCurves(getCurves(graphingData, batteryIds, plotByBasePoints, domain, range))
        }
    }, [graphingData, checked, selectedBatteryId, plotByBasePoints, domain, range])

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
                    <div className='graph-wrapper'>
                        <ResponsiveContainer width={"100%"} height={"100%"}>
                            <LineChart minWidth={0} margin={{top: 20, right: 20, left: 10, bottom: 20}}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" label={{value: "Power [W/cell]", position: "bottom", offset: 0}} dataKey="power" domain={validateBoundaries(domain, range)[0] ? domain : null}/>
                                <YAxis type="number" label={{value: "Time [mins]", position: "insideLeft", offset: 10, angle: -90}} domain={validateBoundaries(domain, range)[1] ? range : null}/>
                                { !(validateBoundaries(domain, range)).every((v)=>v) ? null :
                                    <>
                                        {Object.entries(curves).map(([id, curve])=>{
                                            return (
                                                <Line key={"batteryLineChart#"+id} isAnimationActive={false}
                                                    stroke={id === selectedBatteryId? colorsForColorClasses[color] : colors[id]}
                                                    strokeWidth={id === selectedBatteryId ? 2 : 1}
                                                    dot={showPoints} data={curve} dataKey={"time"}
                                                />
                                            )
                                        })}
                                        {
                                            dotOrAsymptotes[0] !== null && isInRange(dotOrAsymptotes[0], domain)
                                            ? <Line
                                                isAnimationActive={false}
                                                stroke={colorsForColorClasses[color]}
                                                strokeDasharray="4 4"
                                                dot={false} data={[{"power": dotOrAsymptotes[0], "time": range[0]}, {"power": dotOrAsymptotes[0], "time": range[1]}]} dataKey={'time'}
                                            />
                                            : null
                                        }
                                        {
                                            dotOrAsymptotes[1] !== null && isInRange(dotOrAsymptotes[1], range)
                                            ? <Line
                                                isAnimationActive={false}
                                                stroke={colorsForColorClasses[color]}
                                                strokeDasharray="4 4"
                                                dot={false} data={[{"power": domain[0], "time": dotOrAsymptotes[1]}, {"power": domain[1], "time": dotOrAsymptotes[1]}]} dataKey={'time'}
                                            />
                                            : null
                                        }
                                        {
                                            dotOrAsymptotes[0] !== null && dotOrAsymptotes[1] !== null && isInRange(dotOrAsymptotes[0], domain) && isInRange(dotOrAsymptotes[1], range) 
                                            ? <Line
                                                isAnimationActive={false}
                                                stroke={colorsForColorClasses[color]}
                                                dot={true} data={[{"power": dotOrAsymptotes[0], "time": dotOrAsymptotes[1]}]} dataKey={'time'}
                                            />
                                            : null
                                        }
                                    </>
                                }
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    
                    <div className='graph-controls-wrapper'>
                        <table className='graph-controls-table'>
                            <tbody>
                                <tr>
                                    <td><label htmlFor='Pmin'>P min:</label></td>
                                    <td><input className="number-input" type="number" id="Pmin" step="0.01" value={domain[0] === null ? "" : domain[0]} onChange={(e)=>{const parsedVal=parseFloat(e.target.value); setDomain([(isNaN(parsedVal) ? null : parsedVal), domain[1]])}}></input></td>
                                    <td><label htmlFor='Pmax'>P max:</label></td>
                                    <td><input className="number-input" type="number" id="Pmax" step="0.01" value={domain[1] === null ? "" : domain[1]} onChange={(e)=>{const parsedVal=parseFloat(e.target.value); setDomain([domain[0], (isNaN(parsedVal)? null : parsedVal)])}}></input></td>
                                    <td>
                                        <label htmlFor='pbbp'>plot by base points:</label>
                                        <input type="checkbox" id="pbbp" checked={plotByBasePoints} onChange={(e)=>{
                                            setPlotByBasePoints(e.target.checked);
                                        }}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label htmlFor='tmin'>t min:</label></td>
                                    <td><input className="number-input" type="number" id="tmin" step="0.01" value={range[0] === null ? "" : range[0]} onChange={(e)=>{const parsedVal=parseFloat(e.target.value); setRange([(isNaN(parsedVal)? null : parsedVal), range[1]])}}></input></td>
                                    <td><label htmlFor='tmax'>t max:</label></td>
                                    <td><input className="number-input" type="number" id="tmax" step="0.01" value={range[1] === null ? "" : range[1]} onChange={(e)=>{const parsedVal=parseFloat(e.target.value); setRange([range[0], (isNaN(parsedVal)? null : parsedVal)])}}></input></td>
                                    <td>
                                        <label htmlFor='sp'>show points:</label>
                                        <input type="checkbox" id="sp" checked={showPoints} onChange={(e)=>{
                                            setShowPoints(e.target.checked);
                                        }}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='graph-batt-list-table-container'>
                    <Table data={listTableData} columnNames={listTableColumnNames} columnSorts={listTableColumnSorts} 
                    selectedBatteryId={selectedBatteryId} setSelectedBatteryId={setSelectedBatteryId}
                    outerChecked={checked} outerSetChecked={setChecked}
                    validation={(ents)=>{return [ents, {'batteryGraphListView': 'td-left'}]}}
                    color={color} checkboxColors={colors}/>
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