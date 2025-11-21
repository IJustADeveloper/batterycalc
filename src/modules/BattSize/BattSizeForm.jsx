import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik';

import { getBatteryData } from '../../store/battSizeApp/battSizeGetData.js'
import { clearChecked, updateSelectedBatteryId, updateFormValues } from '../../store/battSizeApp/battSizeActionCreators.js'

import Form from "../../components/Form";

const BattSizeForm = () => {
    const dispatch = useDispatch()

    const initialValues = useSelector( state => state.battSize.formValues) ?? {
            'power': '',
            'cos_fi': 1,
            'efficiency': '',
            'bElements': '',
            'groups': 1,
            'dc_time': '',
            'depth': '',
            'percent': ''
        };

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: async (values) => {
            let formData = structuredClone(values)
            formData.bElements *= 6
            
            const powerW = formData.power * formData.cos_fi * 1000
            const power_el = powerW * 100 / (formData.groups * formData.bElements * formData.efficiency)

            formData.power_el = power_el

            let preCalcFields = [...calculatedFieldsParams];
            preCalcFields[0].value = powerW / 1000; preCalcFields[1].value = power_el;
            setCalculatedFieldsParams(preCalcFields);

            await dispatch(getBatteryData(formData))
            dispatch(updateFormValues(values))
            dispatch(clearChecked())
            dispatch(updateSelectedBatteryId(null))
        }
    })

    const formFieldsParams = [
        { id: 'power', label: 'S of load', units: 'kVA', inputParams: { className: 'number-input', type: 'number', step: 'any', onChange: formik.handleChange, value: formik.values.power} },
        { id: 'cos_fi', label: 'cos(fi) of load', units: '-', inputParams: { className: 'number-input', type: 'number', step: '0.01', max: '1', onChange: formik.handleChange, value: formik.values.cos_fi} },
        { id: 'efficiency', label: 'Inverter efficiency', units: '%', inputParams: { className: 'number-input', type: 'number', max: '100', step: 'any', onChange: formik.handleChange, value: formik.values.efficiency} },
        { id: 'bElements', label: 'Q of batteries (12V)', units: 'pcs', inputParams: { className: 'number-input', type: 'number', step: '1', onChange: formik.handleChange, value: formik.values.bElements} },
        { id: 'groups', label: 'Q of strings', units: 'pcs', inputParams: { className: 'number-input', type: 'number', step: '1', onChange: formik.handleChange, value: formik.values.groups} },
        { id: 'dc_time', label: 'Time', units: 'min', inputParams: { className: 'number-input', type: 'number', step: '0.01', name: 'dc_time', onChange: formik.handleChange, value: formik.values.dc_time} },
        { id: 'depth', label: 'Depth of discharge', units: 'V/cell', inputParams: { className: 'number-input', type: 'number', step: '0.01', max: '2', onChange: formik.handleChange, value: formik.values.depth} },
        { id: 'percent', label: 'Margin', units: '%', inputParams: { className: 'number-input', type: 'number', step: 'any', onChange: formik.handleChange, value: formik.values.percent } }
    ]

    const [calculatedFieldsParams, setCalculatedFieldsParams] = useState([
        { label: "P of load, kW", value: '\u2013' },
        { label: "P battery, W/cell", value: '\u2013' }
    ])

    return (
        <Form formFieldsParams={formFieldsParams} calculatedFieldsParams={calculatedFieldsParams} handleSubmit={formik.handleSubmit} isSubmitting={formik.isSubmitting}/>
    )
}

export default BattSizeForm