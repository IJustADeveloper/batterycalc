import {useLayoutEffect, useRef, useMemo} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'



function AdditionalInfoCard({data, selectedBatteryId, setSelectedCurrency, currencies=null, selectedCurrency=null}){

    const location = useLocation()

    let total_batt_num = null
    if (data !== null){
        let battery = data.data[selectedBatteryId]
        if (battery !== undefined)
        {
            total_batt_num = data.data[selectedBatteryId].num_batteries_total
        }
    }

    let price = null
    if (data !== null && selectedCurrency !== null){
        let battery = data.data[selectedBatteryId]
        if (battery !== undefined){
            if (battery.price.price_min !== null){
                price = Math.ceil(battery.price.price_min * currencies[battery.price.currency].equivalent / currencies[battery.price.currency].currency_amount * currencies[selectedCurrency.currency].currency_amount / currencies[selectedCurrency.currency].equivalent)
                price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }else{
                price = battery.price.alt_price
            }
        }
    }

    let currency_options = []
    if(currencies !== null){
        for (let key in currencies) {
            currency_options.push(<option value={currencies[key].currency} key={currencies[key].currency}>{currencies[key].currency}</option>)
        }
    }

    let batt = null
    if (data !== null){
        let adinfo = data.adinfo
        batt = adinfo[selectedBatteryId]
    }

    if (batt === undefined){
        batt = null
    }

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

    let capacity_name = null;
    let capacity_value = null;
    if (batt !== null){
        if (batt.capacity_C10 !== null){
            capacity_name = 'Capacity C10, Ah'
            capacity_value = batt.capacity_C10
        }
        else if (batt.capacity_C20 !== null){
            capacity_name = 'Capacity C20, Ah'
            capacity_value = batt.capacity_C20
        }
        else if(batt.capacity_other !== null){
            capacity_name = `Capacity ${batt.capacity_other_time}min, ${batt.capacity_other_measure}`
            capacity_value = batt.capacity_other
        }
    }

    console.log(location.pathname)

    return(
        <>
            <div className='adinfo-card-container'>
                <div className=''>
                    <div className={'adinfo-card-details-header' + (location.pathname === '/batterycalc/' ? ' maroon' : ' cyan')}>
                        <img src='assets/battery-details-icon.svg' alt='' width='26px' height='18px'/>
                        <p>Battery details:</p>
                    </div>
                    <div className='adinfo-card-details-container'>
                        <div className='adinfo-card-details-names'>
                            <img src={batt !== null && batt.image_link !== null ? batt.image_link :  'assets/Nonbranded_battery-picture_300.png'} alt='no image' width='84px' height='84px'/>
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
                                        <td>{capacity_name !== null ? capacity_name : 'Capacity'}</td>
                                        <td>{capacity_value !== null ? capacity_value :  '-'}</td>
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
                            <button className='datasheet-link-button' disabled={isButtonDisabled} onClick={() => {if (batt !== null && batt.docs_link !== null){window.open(batt.docs_link, '_blank')}}}>
                                <div>Datasheet</div> 
                                <img src='assets/datasheet-link-button.svg' alt='' width='18px' height='18px'/>
                            </button>
                        </div>
                    </div>
                </div>

                <div className='adinfo-card-summary-main-container'>
                    <div className={'adinfo-card-summary-header' + (location.pathname === '/batterycalc/' ? ' maroon' : ' cyan')}>
                        <img src='assets/sum-icon.svg' alt='' width='18px' height='18px'/>
                        <p>Solution summary:</p>
                    </div>
                    <div className='adinfo-card-summary-container'>
                        <table>
                            <tbody>
                                <tr>
                                    <td><img src='assets/mass-icon.svg' alt='' width='26px' height='26px'/></td>
                                    <td>{total_batt_num !== null && batt !== null && batt.weight !== null ? (batt.weight * total_batt_num).toFixed(1) :  '-'}</td>
                                    <td>kg</td>
                                </tr>
                                <tr>
                                    <td><img src='assets/volume-icon.svg' alt='' width='26px' height='26px'/></td>
                                    <td>{total_batt_num !== null && batt !== null && batt.length !== null && batt.width !== null && (batt.height !== null || batt.max_height !== null) ? (batt.width * batt.length * f(batt.height, batt.max_height) * total_batt_num / 1000000000).toFixed(3) :  '-'}</td>
                                    <td>m3</td>
                                </tr>
                                <tr>
                                    <td><img src='assets/cost-icon.svg' alt='' width='26px' height='26px'/></td>
                                    <td>{price !== null  ? price :  '-'}</td>
                                    <td>
                                        <select value={selectedCurrency.currency} onChange={(e) => setSelectedCurrency(currencies[e.target.value])} className='adinfo-card-summary-curreny-select'>
                                            {currency_options}
                                        </select>
                                    </td>
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