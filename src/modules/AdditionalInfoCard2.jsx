import { formatPrice } from "../utils/format"

function AdditionalInfoCard({additionalData, dischargeData, selectedBatteryId, setSelectedCurrency, currencies=null, selectedCurrency=null, headerColor='maroon'}){

    const minOrNotNull = function(a, b){
        if (a === null) return b 
        if (b === null)return a
        return Math.min(a, b)
    }

    const batteryAddtionalData = additionalData?.[selectedBatteryId] ?? null
    const batteryDischargeData = dischargeData?.[selectedBatteryId] ?? null

    const totalBatteriesNumber = batteryDischargeData?.num_batteries_total ?? null

    const mass = totalBatteriesNumber && batteryAddtionalData?.weight ? (batteryAddtionalData.weight * totalBatteriesNumber).toFixed(1) :  '-'
    const volume = totalBatteriesNumber && batteryAddtionalData?.length && batteryAddtionalData?.width && (batteryAddtionalData?.height || batteryAddtionalData?.max_height) ? (batteryAddtionalData.width * batteryAddtionalData.length * minOrNotNull(batteryAddtionalData.height, batteryAddtionalData.max_height) * totalBatteriesNumber / 1000000000).toFixed(3) :  '-'
    const price = batteryDischargeData?.price ? formatPrice(batteryDischargeData.price, currencies, selectedCurrency) : '-'
    
    const currencyOptions = Object.values(currencies ?? {}).map((c)=> <option value={c.currency} key={c.currency}>{c.currency}</option>)

    const capacityValue = batteryAddtionalData?.capacity_C10 ?? batteryAddtionalData?.capacity_C20 ?? batteryAddtionalData?.capacity_other ?? '-'
    const capacityName = (
        batteryAddtionalData?.capacity_C10 || batteryAddtionalData?.capacity_C10 === 0 ? 'Capacity C10, Ah' :
        batteryAddtionalData?.capacity_C20 || batteryAddtionalData?.capacity_C20 === 0 ? 'Capacity C20, Ah' :
        batteryAddtionalData?.capacity_other || batteryAddtionalData?.capacity_other === 0 ? `Capacity ${batteryAddtionalData.capacity_other_time}min, ${batteryAddtionalData.capacity_other_measure}` :
        'Capacity'
    )

    return(
        <>
            <div className='adinfo-card-container'>
                <div className=''>
                    <div className={'adinfo-card-details-header ' + headerColor}>
                        <img src='assets/battery-details-icon.svg' alt='' width='26px' height='18px'/>
                        <p>Battery details:</p>
                    </div>
                    <div className='adinfo-card-details-container'>
                        <div className='adinfo-card-details-names'>
                            <img src={batteryAddtionalData?.image_link ??  'assets/Nonbranded_battery-picture_300.png'} alt='no image' width='84px' height='84px'/>
                            <div>
                                <p>{batteryAddtionalData?.model ??  'Pick a line'}</p>
                                <p>{batteryAddtionalData?.vendor ??  ''}</p>
                                <p>{batteryAddtionalData?.series ??  ''}</p>
                            </div>
                        </div>

                        <div className='adinfo-card-details'>
                            <p>Characteristics:</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Technology</td>
                                        <td>{batteryAddtionalData?.technology ?? '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>Voltage, V</td>
                                        <td>{batteryAddtionalData?.voltage ??  '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>{capacityName}</td>
                                        <td>{capacityValue}</td>
                                    </tr>
                                    <tr>
                                        <td>Lifespan, years</td>
                                        <td>{batteryAddtionalData?.lifespan ??  '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>Terminal Type</td>
                                        <td>{batteryAddtionalData?.terminal_type ??  '-'}</td>
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
                                        <td>{batteryAddtionalData?.length ??  '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>Width, mm</td>
                                        <td>{batteryAddtionalData?.width ??  '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>Height, mm</td>
                                        <td>{batteryAddtionalData?.height ??  '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>Max height, mm</td>
                                        <td>{batteryAddtionalData?.max_height ??  '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>Weight, kg</td>
                                        <td>{batteryAddtionalData?.weight ?? '-'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className='button-container'>
                            <button className='datasheet-link-button' disabled={batteryAddtionalData?.docs_link ? true : false} onClick={() => {if (batteryAddtionalData?.docs_link){window.open(batteryAddtionalData.docs_link, '_blank')}}}>
                                <div>Datasheet</div> 
                                <img src='assets/datasheet-link-button.svg' alt='' width='18px' height='18px'/>
                            </button>
                        </div>
                    </div>
                </div>

                <div className='adinfo-card-summary-main-container'>
                    <div className={'adinfo-card-summary-header ' + headerColor}>
                        <img src='assets/sum-icon.svg' alt='' width='18px' height='18px'/>
                        <p>Solution summary:</p>
                    </div>
                    <div className='adinfo-card-summary-container'>
                        <table>
                            <tbody>
                                <tr>
                                    <td><img src='assets/mass-icon.svg' alt='' width='26px' height='26px'/></td>
                                    <td>{mass}</td>
                                    <td>kg</td>
                                </tr>
                                <tr>
                                    <td><img src='assets/volume-icon.svg' alt='' width='26px' height='26px'/></td>
                                    <td>{volume}</td>
                                    <td>m3</td>
                                </tr>
                                <tr>
                                    <td><img src='assets/cost-icon.svg' alt='' width='26px' height='26px'/></td>
                                    <td>{price}</td>
                                    <td>
                                        <select value={selectedCurrency.currency} onChange={(e) => setSelectedCurrency(e.target.value)} className='adinfo-card-summary-curreny-select'>
                                            {currencyOptions}
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