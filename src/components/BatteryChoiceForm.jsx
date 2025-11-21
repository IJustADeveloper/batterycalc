import {useState, useEffect} from 'react'
import MultipleChoiceWithHeaders from './MultipleChoiceWithHeaders.jsx';

function BatteryChoiceForm({names, pickedNames, setPickedNames, headerNum=1, headerColor='maroon'}){

  const [showingSeries, setShowingSeries] = useState({});
  const [showingModels, setShowingModels] = useState({});

  function handleChangeNames(event){
    let formInput = event.target

    if (formInput.type !== 'checkbox'){
      return;
    }
    
    setPickedNames(formInput.dataset.answertype, formInput.dataset.header, formInput.value)
  }

  useEffect(()=>{
    let preShowingSeries = {}
    let preShowingModels = {}
    Object.keys(pickedNames).forEach(vendorName=>{
      preShowingSeries[vendorName] = Object.keys(names[vendorName])
      Object.keys(pickedNames[vendorName]).forEach(seriesName=>{
        preShowingModels[`${vendorName}/${seriesName}`] = names[vendorName][seriesName]
      })
    })
    setShowingSeries(preShowingSeries)
    setShowingModels(preShowingModels)
  }, [pickedNames])

  return (
        (names === null ? (<></>) : ( 
            <>
                <form onChange={handleChangeNames}>
                    <div className='choose-batt-container'>
                        <div className='numbered-header'>
                            <div className={'number-box '+headerColor}>{headerNum}</div>
                            <p>Choose batteries:</p>
                        </div>
                        <div className='flex'>
                            <MultipleChoiceWithHeaders header='Brand' answertype={'vendor'} data={{'Brands': Object.keys(names)}}/>
                            <MultipleChoiceWithHeaders header='Series' answertype={'series'} data={showingSeries}/>
                            <MultipleChoiceWithHeaders header='Model' answertype={'model'} data={showingModels}/>
                        </div>
                    </div>
                </form>
            </>
        ))
    
  )
}

export default BatteryChoiceForm