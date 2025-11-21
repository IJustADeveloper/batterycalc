import { useSelector, useDispatch } from "react-redux"
import { updateSelectedBatteryId, updateChecked } from "../../store/battSizeApp/battSizeActionCreators";

import { defaultSort, priceSort } from "../../utils/Sorts";
import { formatNumbers, formatMargin, formatTimeFromMinutes, formatPrice } from "../../utils/format";

import Table from "../Table";

const BattSizeResultsTable = () => {
    const dispatch = useDispatch()

    const { dischargeData, checked, selectedBatteryId, currencies, selectedCurrency } = useSelector(state => state.battSize)
    const columnNames = ['Brand', 'Model', 't BOL', 't EOL', 'Q / string', 'Strings', 'Total', 'Margin', 'Sum '+ currencies[selectedCurrency].currency]
    const columnClasses = {'vendor': 'td-left', 'series': 'td-left','model': 'td-left', 'battery_id': 'hide-td'}
	const columnSorts = [defaultSort, defaultSort, defaultSort, defaultSort, defaultSort, defaultSort, defaultSort, defaultSort, priceSort]

    const setSelectedBatteryId = (batteryId) => {dispatch(updateSelectedBatteryId(batteryId))}
    const setChecked = (batteryId) => {dispatch(updateChecked(batteryId))}

    const format = (entries) => {
        entries = structuredClone(entries)
        entries = entries.map(([b_id, row]) => {
            for (let [key, value] of Object.entries(row)){
                if (typeof value == 'number' && !Number.isInteger(value)){
                    row[key] = formatNumbers(value)
                }
            }

            row.margin = formatMargin(row.margin)
            row.discharge_time_start_life = formatTimeFromMinutes(row.discharge_time_start_life)
            row.discharge_time_end_life = formatTimeFromMinutes(row.discharge_time_end_life)
            row.price = formatPrice(row.price, currencies, selectedCurrency)

            return [b_id, row]
        })

        return entries
    }

    return (
        <Table 
            data={dischargeData !== null && dischargeData} 
            columnNames={columnNames}
            columnClasses = {columnClasses}
            columnSorts={columnSorts} 
            selectedBatteryId={selectedBatteryId} 
            setSelectedBatteryId={setSelectedBatteryId} 
            checked={checked} 
            setChecked={setChecked} 
            format={format} 
            color={"maroon"}
        />
    )
}

export default BattSizeResultsTable