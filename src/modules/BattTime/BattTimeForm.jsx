import { useState } from 'react';
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { getBatteryData, } from '../../store/battTimeApp/battTimeGetData.js'
import { clearChecked, updateFormValues, updateSelectedBatteryId } from '../../store/battTimeApp/battTimeActionCreators.js'

import Form from "../../components/Form";


const BattTimeForm = () => {
    const dispatch = useDispatch()

    const pickedBatteryNames = useSelector(state => state.battTime.pickedBatteryNames)
    const batteryDepthOfDischargeValues = useSelector( state => state.shared.batteryDepthOfDischargeValues)

    const initialValues = useSelector(state => state.battTime.formValues) ?? {
        'powerS': '',
        'cos_fi': 1,
        'powerP': '',
        'efficiency': '',
        'bElements': '',
        'groups': 1,
        'depth': ''
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: async (values) => {
            let formData = structuredClone(values)
            formData.bElements *= 6
            
            const powerW = formData.powerP * 1000
            const power_el = powerW * 100 / (formData.groups * formData.bElements * formData.efficiency)

            formData.power_el = power_el

            formData.names = structuredClone(pickedBatteryNames)

            let preCalcFields = [...calculatedFieldsParams];
            preCalcFields[0].value = power_el;
            setCalculatedFieldsParams(preCalcFields);

            await dispatch(getBatteryData(formData))
            dispatch(updateFormValues(values))
            dispatch(clearChecked())
            dispatch(updateSelectedBatteryId(null))
        }
    })

    const formFieldsParams = [
        { id: 'powerS', label: 'S of load', units: 'kVA', fieldType: "input", fieldParams: { className: 'number-input', type: 'number', step: 'any', onChange: formik.handleChange, value: formik.values.powerS} },
        { id: 'cos_fi', label: 'cos(fi) of load', units: '-', fieldType: "input", fieldParams: { className: 'number-input', type: 'number', step: '0.01', max: '1', onChange: formik.handleChange, value: formik.values.cos_fi} },
        { id: 'powerP', label: 'P of load', units: 'kW', fieldType: "input", fieldParams: { className: 'number-input', type: 'number', step: 'any', onChange: formik.handleChange, value: formik.values.powerP} },
        { id: 'efficiency', label: 'Inverter efficiency', units: '%', fieldType: "input", fieldParams: { className: 'number-input', type: 'number', max: '100', step: 'any', onChange: formik.handleChange, value: formik.values.efficiency} },
        { id: 'bElements', label: 'Q of batteries (12V)', units: 'pcs', fieldType: "input", fieldParams: { className: 'number-input', type: 'number', step: '1', onChange: formik.handleChange, value: formik.values.bElements} },
        { id: 'groups', label: 'Q of strings', units: 'pcs', fieldType: "input", fieldParams: { className: 'number-input', type: 'number', step: '1', onChange: formik.handleChange, value: formik.values.groups} },
        { id: 'depth', label: 'Depth of discharge', units: 'V/cell', fieldType: "select", fieldParams: { className: 'number-select', onChange: formik.handleChange, value: formik.values.depth, options: batteryDepthOfDischargeValues} },
    ]

    const [calculatedFieldsParams, setCalculatedFieldsParams] = useState([
        { label: "P battery, W/cell", value: '\u2013' }
    ])

    function handleChangeForm(event) {
        const formInput = event.target

        if (formInput.id === 'powerS') {
           formik.setFieldValue('powerP', formInput.value * formik.values.cos_fi)
        }
        else if (formInput.id === 'cos_fi') {
            formik.setFieldValue('powerP', formInput.value * formik.values.powerS)
        }
        else if (formInput.id === 'powerP') {
            if (formInput.value / formik.values.powerS > 1) {
                formik.setFieldValue('cos_fi', 1)
                formik.setFieldValue('powerS', formInput.value)
            }
            else {
                formik.setFieldValue('cos_fi', formInput.value / formik.values.powerS)
            }
        }
    }

    return (
        <Form formFieldsParams={formFieldsParams} calculatedFieldsParams={calculatedFieldsParams} handleSubmit={formik.handleSubmit} handleChange={handleChangeForm} isSubmitting={formik.isSubmitting} headerNum={2} headerColor='yellow' />
    )
}

export default BattTimeForm