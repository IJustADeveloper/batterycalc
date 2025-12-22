import Results from '../modules/Results.jsx'
import BattTimeResultsTable from '../modules/BattTime/BattTimeResultsTable.jsx'
import BattTimeAddInfoCard from '../modules/BattTime/BattTimeAddInfoCard.jsx'
import BattTimeBatteryChoiceForm from '../modules/BattTime/BattTimeBatteryChoiceForm.jsx'
import BattTimeForm from '../modules/BattTime/BattTimeForm.jsx'


const BatteryTimeApp = () => {

    return (
            <>  
            <div className='batttime-page-header'><p>Battery Time</p><img src='assets/battery-time-icon.svg' alt='' width='34px' height='32px' /></div>
            <div className='batttime-page-container'>
                <div>
                    <BattTimeBatteryChoiceForm/>
                    <BattTimeForm/>
                </div>
                <Results headerNum={3} headerColor='cyan'>
                    <BattTimeResultsTable/>
                    <h1>GRAPH</h1>
                </Results>
                <BattTimeAddInfoCard/>
            </div>
            </>
        )
}

export default BatteryTimeApp