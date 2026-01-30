import { useSelector, useDispatch } from "react-redux"

import AdditionalInfoCard from "../AdditionalInfoCard";
import { updateSelectedCurrency } from "../../store/battSizeApp/battSizeActionCreators";


const BattSizeAddInfoCard = () => {
    const dispatch = useDispatch()

    const { currencies } = useSelector(state => state.shared)
    const { solutionData, additionalData, selectedSolutionId, selectedCurrency } = useSelector(state => state.battSize)

    const setSelectedCurrency = (currency) => {dispatch(updateSelectedCurrency(currency))}

    return (
        <AdditionalInfoCard
            additionalData={additionalData}
            solutionData={solutionData}
            selectedSolutionId={selectedSolutionId}
            currencies={currencies}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
        />
    )
}

export default BattSizeAddInfoCard