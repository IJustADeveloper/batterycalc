import { useSelector, useDispatch } from "react-redux"
import { updateSelectedBatteryId, updateChecked } from "../../store/battTimeApp/battTimeActionCreators";

import { defaultSort, priceSort } from "../../utils/Sorts";
import { formatNumbers, formatTimeFromMinutes, formatPrice, formatBatteryPrice } from "../../utils/format";

import Table from "../Table";

const BattTimeResultsTable = () => {
    const dispatch = useDispatch()

    const { currencies } = useSelector(state => state.shared)
    const { dischargeData, checked, selectedBatteryId, selectedCurrency } = useSelector(state => state.battTime)
    const columnNames = ['Brand', 'Model', 't BOL', 't EOL', 'Q / string', 'Strings', 'Total', 'Sum '+ currencies[selectedCurrency].currency]
    const columnClasses = {'vendor': 'td-left', 'series': 'td-left','model': 'td-left', 'battery_id': 'hide-td'}
	const columnSorts = [defaultSort, defaultSort, defaultSort, defaultSort, defaultSort, defaultSort, defaultSort, priceSort]

    const setSelectedBatteryId = (batteryId) => {dispatch(updateSelectedBatteryId(batteryId))}
    const setChecked = (batteryId) => {dispatch(updateChecked(batteryId))}

    const preSortFormat = (entries) => {
        entries = structuredClone(entries)
        entries = entries.map(([b_id, row]) => {
            row.price = formatBatteryPrice(row.price, currencies, selectedCurrency)
            row.price.currency = selectedCurrency
            return [b_id, row]
        })
        return entries
    }

    const format = (entries) => {
        entries = structuredClone(entries)
        entries = entries.map(([b_id, row]) => {
            for (let [key, value] of Object.entries(row)){
                if (typeof value == 'number' && !Number.isInteger(value)){
                    row[key] = formatNumbers(value)
                }
            }
            
            row.discharge_time_start_life = formatTimeFromMinutes(row.discharge_time_start_life)
            row.discharge_time_end_life = formatTimeFromMinutes(row.discharge_time_end_life)
            row.price = row.price.price_min ? formatPrice(row.price.price_min) : row.price.alt_price

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
            selectedRowId={selectedBatteryId} 
            setSelectedRowId={setSelectedBatteryId} 
            checked={checked} 
            setChecked={setChecked} 
            preSortFormat={preSortFormat}
            format={format} 
            color={"maroon"}
        />
    )
}

export default BattTimeResultsTable