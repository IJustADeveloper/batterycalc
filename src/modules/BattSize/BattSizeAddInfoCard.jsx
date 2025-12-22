import { useSelector, useDispatch } from "react-redux"

import AdditionalInfoCard from "../AdditionalInfoCard";
import { updateSelectedCurrency } from "../../store/battSizeApp/battSizeActionCreators";


const BattSizeAddInfoCard = () => {
    const dispatch = useDispatch()

    const { currencies } = useSelector(state => state.shared)
    const { dischargeData, additionalData, selectedBatteryId, selectedCurrency } = useSelector(state => state.battSize)

    const setSelectedCurrency = (currency) => {dispatch(updateSelectedCurrency(currency))}

    return (
        <AdditionalInfoCard
            additionalData={additionalData}
            dischargeData={dischargeData}
            selectedBatteryId={selectedBatteryId}
            currencies={currencies}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
        />
    )
}

export default BattSizeAddInfoCard