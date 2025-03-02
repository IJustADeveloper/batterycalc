import React from 'react'
import {useNavigate} from 'react-router-dom'

function AdditionalInfoCard({data, selectedBatteryId}){

    let batt = null
    if (data !== null){
        let adinfo = data.adinfo
        batt = adinfo[selectedBatteryId]
    }

    if (batt === undefined){
        batt = null
    }
    
    let tr = document.getElementById(selectedBatteryId)

    const f = function(a, b){
        if (a === null){
            return b
        }else if (b === null){
            return a
        }else{
            return Math.min(a, b)
        }
    }

    let isButtonDisabled = true
    if (batt !== null && batt.docs_link !== null){
        isButtonDisabled = false;
        
    }

    return(
        <>
            <div className='adinfo-card-container'>
                <div className=''>
                    <div className='adinfo-card-details-header'>
                        <img src='assets/battery-details-icon.svg' alt='' width='26px' height='18px'/>
                        <p>Battery details:</p>
                    </div>
                    <div className='adinfo-card-details-container'>
                        <div className='adinfo-card-details-names'>
                            <img src={batt !== null && batt.image_link !== null ? batt.image_link :  ''} alt='no image' width='84px' height='84px'/>
                            <div>
                                <p>{batt !== null && batt.model !== null ? batt.model :  'Pick a line'}</p>
                                <p>{batt !== null && batt.vendor !== null ? batt.vendor :  ''}</p>
                                <p>{batt !== null && batt.series !== null ? batt.series :  ''}</p>
                            </div>
                        </div>

                        <div className='adinfo-card-details'>
                            <p>Characteristics:</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Technology</td>
                                        <td>{batt !== null && batt.technology !== null ? batt.technology :  '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>Voltage, V</td>
                                        <td>{batt !== null && batt.voltage !== null ? batt.voltage :  '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>Capacity C10, Ah</td>
                                        <td>{batt !== null && batt.capacity_C10 !== null ? batt.capacity_C10 :  '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>Lifespan, years</td>
                                        <td>{batt !== null && batt.lifespan !== null ? batt.lifespan :  '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>Terminal Type</td>
                                        <td>{batt !== null && batt.terminal_type !== null ? batt.terminal_type :  '-'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>  

                        <div className='adinfo-card-details'>
                            <p>Dimensions & weight:</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Length, mm</td>
                                        <td>{batt !== null && batt.length !== null ? batt.length :  '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>Width, mm</td>
                                        <td>{batt !== null && batt.width !== null ? batt.width :  '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>Height, mm</td>
                                        <td>{batt !== null && batt.height !== null ? batt.height :  '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>Max height, mm</td>
                                        <td>{batt !== null && batt.max_height !== null ? batt.max_height :  '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>Weight, kg</td>
                                        <td>{batt !== null && batt.weight !== null ? batt.weight :  '-'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className='button-container'>
                            <button className='datasheet-link-button' disabled={isButtonDisabled} onClick={() => window.location.replace(batt !== null && batt.docs_link !== null ? batt.docs_link :  '')}>
                                <div>Datasheet</div> 
                                <img src='assets/datasheet-link-button.svg' alt='' width='18px' height='18px'/>
                            </button>
                        </div>
                    </div>
                </div>

                <div className='adinfo-card-summary-main-container'>
                    <div className='adinfo-card-summary-header'>
                        <img src='assets/sum-icon.svg' alt='' width='18px' height='18px'/>
                        <p>Solution summary:</p>
                    </div>
                    <div className='adinfo-card-summary-container'>
                        <table>
                            <tbody>
                                <tr>
                                    <td><img src='assets/mass-icon.svg' alt='' width='26px' height='26px'/></td>
                                    <td>{tr !== null && batt !== null && batt.weight !== null ? (batt.weight * parseFloat(tr.children[6].innerText)).toFixed(1) :  '-'}</td>
                                    <td>kg</td>
                                </tr>
                                <tr>
                                    <td><img src='assets/volume-icon.svg' alt='' width='26px' height='26px'/></td>
                                    <td>{tr !== null && batt !== null && batt.length !== null && batt.width !== null && (batt.height !== null || batt.max_height !== null) ? (batt.width * batt.length * f(batt.height, batt.max_height) * parseFloat(tr.children[6].innerText) / 1000000000).toFixed(3) :  '-'}</td>
                                    <td>m3</td>
                                </tr>
                                <tr>
                                    <td><img src='assets/cost-icon.svg' alt='' width='26px' height='26px'/></td>
                                    <td>-</td>
                                    <td>USD</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='button-container'>
                            <button className='data-entry-submit-button' style={{margin: '0', padding: '6px 15px'}}>
                                <div>Save results</div><img src='assets/calculate-button-icon.svg' alt='' width='18px' height='18px'/>
                            </button>
                        </div>
                        <div className='small-info-container'>
                            <img src='assets/info-icon.svg' alt='' width='13px' height='13px'/>
                            <p>Select rows in Table Results you want to save before pushing the button above.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdditionalInfoCard