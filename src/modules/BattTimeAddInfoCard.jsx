import { useSelector, useDispatch } from "react-redux"

import AdditionalInfoCard from "./AdditionalInfoCard2";
import { updateSelectedCurrency } from "../store/battTimeApp/battTimeActionCreators";


const BattTimeAddInfoCard = () => {
    const dispatch = useDispatch()

    const {dischargeData, additionalData, selectedBatteryId, currencies, selectedCurrency} = useSelector(state => state.battTime)

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

export default BattTimeAddInfoCard