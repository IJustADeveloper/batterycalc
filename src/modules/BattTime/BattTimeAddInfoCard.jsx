import { useSelector, useDispatch } from "react-redux"

import AdditionalInfoCard from "../AdditionalInfoCard";
import { updateSelectedCurrency } from "../../store/battTimeApp/battTimeActionCreators";


const BattTimeAddInfoCard = () => {
    const dispatch = useDispatch()

    const { currencies } = useSelector(state => state.shared)
    const { dischargeData, additionalData, selectedBatteryId, selectedCurrency } = useSelector(state => state.battTime)

    const setSelectedCurrency = (currency) => {dispatch(updateSelectedCurrency(currency))}

    return (
        <AdditionalInfoCard
            additionalData={additionalData}
            solutionData={dischargeData}
            selectedSolutionId={selectedBatteryId}
            currencies={currencies}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
        />
    )
}

export default BattTimeAddInfoCard