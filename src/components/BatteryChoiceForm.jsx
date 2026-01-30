import { useState, useEffect } from 'react'
import MultipleChoiceWithHeaders from './MultipleChoiceWithHeaders.jsx';
import getShowingVendorSeriesModels from '../utils/getShowingVendorsSeriesModels.js';

function BatteryChoiceForm({ names, pickedNames, setPickedNames, headerNum = 1, headerColor = 'maroon' }) {

    const [showingVendors, setShowingVendors] = useState({});
    const [showingSeries, setShowingSeries] = useState({});
    const [showingModels, setShowingModels] = useState({});

    function handleChangeNames(event) {
        let formInput = event.target
        if (formInput.type === 'checkbox') {
            setPickedNames(formInput.dataset.answertype, formInput.dataset.header, formInput.value)
        }
    }

    useEffect(() => {

        const [preShowingVendors, preShowingSeries, preShowingModels] = getShowingVendorSeriesModels(names, pickedNames)

        setShowingVendors(preShowingVendors)
        setShowingSeries(preShowingSeries)
        setShowingModels(preShowingModels)

    }, [pickedNames])

    return (
        (names === null ? (<></>) : (
            <>
                <form onChange={handleChangeNames}>
                    <div className='choose-batt-container'>
                        <div className='numbered-header'>
                            <div className={'number-box ' + headerColor}>{headerNum}</div>
                            <p>Choose batteries:</p>
                        </div>
                        <div className='flex'>
                            <MultipleChoiceWithHeaders header='Brand' answertype={'vendor'} data={showingVendors} />
                            <MultipleChoiceWithHeaders header='Series' answertype={'series'} data={showingSeries} />
                            <MultipleChoiceWithHeaders header='Model' answertype={'model'} data={showingModels} />
                        </div>
                    </div>
                </form>
            </>
        ))
    )
}

export default BatteryChoiceForm