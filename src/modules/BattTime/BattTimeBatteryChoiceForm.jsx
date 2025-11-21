import { useSelector, useDispatch } from "react-redux"

import BatteryChoiceForm from "../../components/BatteryChoiceForm"
import { updatePickedBatteryNames } from "../../store/battTimeApp/battTimeActionCreators"


const BattTimeBatteryChoiceForm = () => {
    const dispatch = useDispatch()
    const {batteryNames, pickedBatteryNames} = useSelector( state => state.battTime)

    const setPickedBatteryNames = (answerType, header, pickedName) => {
        dispatch(updatePickedBatteryNames(answerType, header, pickedName))
    }

    return (<BatteryChoiceForm names={batteryNames} pickedNames={pickedBatteryNames} setPickedNames={setPickedBatteryNames} />)
}

export default BattTimeBatteryChoiceForm