import Results from '../modules/Results.jsx'
import BattSizeResultsTable from '../modules/BattSize/BattSizeResultsTable.jsx'
import BattSizeAddInfoCard from '../modules/BattSize/BattSizeAddInfoCard.jsx'
import BattSizeForm from '../modules/BattSize/BattSizeForm.jsx'


const BatterySizeApp = () => {

	return (
			<>
				<div className='battsize-page-header'><p>Battery Size</p><img src='assets/battery-size-icon.svg' alt='' width='35px' height='33px' /></div>
				<div className='battsize-page-container'>
					<BattSizeForm/>
					<Results>
						<BattSizeResultsTable />
						<h1>GRAPH</h1>
					</Results>
					<BattSizeAddInfoCard />
				</div>
			</>
		)
}

export default BatterySizeApp 