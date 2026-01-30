import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik';

import { getBatteryData } from '../../store/battSizeApp/battSizeGetData.js'
import { clearChecked, updateSelectedSolutionId, updateFormValues } from '../../store/battSizeApp/battSizeActionCreators.js'

import { BATTERY_ELEMENTS } from '../../utils/constants.js';

import Form from "../../components/Form";

const BattSizeForm = () => {
    const dispatch = useDispatch()

    const batteryDepthOfDischargeValues = useSelector( state => state.shared.batteryDepthOfDischargeValues)

    const initialValues = useSelector( state => state.battSize.formValues) ?? {
            'sLoad': '',
            'cos_fi': 1,
            'invEff': '',
            'minQBatt': '',
            'maxQBatt': '',
            'minQStrings': 1,
            'maxQStrings': 1,
            'dcTime': '',
            'depth': '',
            'margin': '',
            'inRespectToTEOL': ''
    };

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: async (values) => {            
            let formData = structuredClone(values)

            formData.sLoad *= 1000 // kVA -> VA
            formData.inRespectToTEOL = formData.inRespectToTEOL === 'yes' // yes/no -> true/false

            let preCalcFields = [...calculatedFieldsParams];

            const powerW = formData.sLoad * formData.cos_fi
            preCalcFields[0].value = powerW / 1000

            if (formData.minQBatt === formData.maxQBatt && formData.minQStrings === formData.maxQStrings){
                const powerEl = powerW * 100 / (formData.minQBatt * formData.minQStrings * BATTERY_ELEMENTS * formData.invEff)
                preCalcFields[1].value = powerEl 
            }
            else {
                const minPowerEl = powerW * 100 / (formData.maxQBatt * formData.maxQStrings * BATTERY_ELEMENTS * formData.invEff)
                const maxPowerEl = powerW * 100 / (formData.minQBatt * formData.minQStrings * BATTERY_ELEMENTS * formData.invEff)
                preCalcFields[1].value = `${minPowerEl.toFixed(2)} - ${maxPowerEl.toFixed(2)}`
            }
            
            setCalculatedFieldsParams(preCalcFields)

            await dispatch(getBatteryData(formData))
            dispatch(updateFormValues(values))
            dispatch(clearChecked())
            dispatch(updateSelectedSolutionId(null))
        }
    })

    const formFieldsParams = [
        { id: 'sLoad', label: 'S of load', units: 'kVA', fieldType: "input", fieldParams: { className: 'number-input', type: 'number', step: 'any', onChange: formik.handleChange, value: formik.values.sLoad} },
        { id: 'cos_fi', label: 'cos(fi) of load', units: '-', fieldType: "input", fieldParams: { className: 'number-input', type: 'number', step: '0.01', max: '1', onChange: formik.handleChange, value: formik.values.cos_fi} },
        { id: 'invEff', label: 'Inverter efficiency', units: '%', fieldType: "input", fieldParams: { className: 'number-input', type: 'number', max: '100', step: 'any', onChange: formik.handleChange, value: formik.values.invEff} },
        { id: 'minQBatt', label: 'Q of batteries (12V)', units: 'pcs', fieldType: "input", fieldLabel: "min: ", fieldParams: { className: 'number-input', type: 'number', step: '1', onChange: formik.handleChange, value: formik.values.minQBatt} },
        { id: 'maxQBatt', label: '', units: '', fieldType: "input", fieldLabel: "max: ", fieldParams: { className: 'number-input', type: 'number', step: '1', onChange: formik.handleChange, value: formik.values.maxQBatt} },
        { id: 'minQStrings', label: 'Q of strings', units: 'pcs', fieldType: "input", fieldLabel: "min: ", fieldParams: { className: 'number-input', type: 'number', step: '1', onChange: formik.handleChange, value: formik.values.minQStrings} },
        { id: 'maxQStrings', label: '', units: '', fieldType: "input", fieldLabel: "max: ", fieldParams: { className: 'number-input', type: 'number', step: '1', onChange: formik.handleChange, value: formik.values.maxQStrings} },
        { id: 'dcTime', label: 'Time', units: 'min', fieldType: "input", fieldParams: { className: 'number-input', type: 'number', step: '0.01', name: 'dc_time', onChange: formik.handleChange, value: formik.values.dcTime} },
        { id: 'depth', label: 'Depth of discharge', units: 'V/cell', fieldType: "select", fieldParams: { className: 'number-select', onChange: formik.handleChange, value: formik.values.depth, options: batteryDepthOfDischargeValues} },
        { id: 'margin', label: 'Margin', units: '%', fieldType: "input", fieldParams: { className: 'number-input', type: 'number', step: 'any', onChange: formik.handleChange, value: formik.values.margin } },
        { id: 'inRespectToTEOL', label: 'In respect to tEOL?', units: '-', fieldType: "select", fieldParams: { className: 'number-select', onChange: formik.handleChange, value: formik.values.inRespectToTEOL, options: ['no', 'yes']} },
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