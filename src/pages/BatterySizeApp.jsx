import { useEffect } from 'react'
import Results from '../modules/Results.jsx'

import { getCurrencies } from '../store/battSizeApp/battSizeGetData.js'
import { useSelector, useDispatch } from 'react-redux'

import BattSizeResultsTable from '../modules/BattSize/BattSizeResultsTable.jsx'
import BattSizeAddInfoCard from '../modules/BattSize/BattSizeAddInfoCard.jsx'
import BattSizeForm from '../modules/BattSize/BattSizeForm.jsx'

function BatterySizeApp() {
	const dispatch = useDispatch()

	const currenciesStatus = useSelector(state => state.battSize.currenciesStatus)

	useEffect(() => { dispatch(getCurrencies()) }, [])

	if (currenciesStatus === 'success') {

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
}

export default BatterySizeApp 