import React from 'react'

function AdditionalInfoCard(){
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
                            <img src='' alt='no image' width='84px' height='84px'/>
                            <div>
                                <p>Model</p>
                                <p>Brand</p>
                                <p>Series</p>
                            </div>
                        </div>

                        <div className='adinfo-card-details'>
                            <p>Characteristics:</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Technology</td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <td>Voltage, V</td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <td>Capacity</td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <td>Lifespan, years</td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <td>Terminal Type</td>
                                        <td>-</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>  

                        <div className='adinfo-card-details'>
`                           <p>Dimensions & weight:</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Length, mm</td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <td>Width, mm</td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <td>Height, mm</td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <td>Max height, mm</td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <td>Weight, kg</td>
                                        <td>-</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <button className='datasheet-link-button'><div>Datasheet</div> <img src='assets/datasheet-link-button.svg' alt='' width='18px' height='18px'/></button>
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
                                    <td>-</td>
                                    <td>kg</td>
                                </tr>
                                <tr>
                                    <td><img src='assets/volume-icon.svg' alt='' width='26px' height='26px'/></td>
                                    <td>-</td>
                                    <td>m3</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdditionalInfoCard