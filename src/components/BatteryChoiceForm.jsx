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

    if (formInput.checked){
      switch (formInput.dataset.answertype){
        case 'vendor':
          setPickedNames({...pickedNames, [formInput.value]: {}})
          break;
        case 'series':
          setPickedNames({...pickedNames, [formInput.dataset.header]:{...pickedNames[formInput.dataset.header], [formInput.value]: {}}})
          break;
        case 'model':
          const [vendorName, seriesName] = formInput.dataset.header.split('/')
          setPickedNames({...pickedNames, [vendorName]:{...pickedNames[vendorName], [seriesName]: {...pickedNames[vendorName][seriesName], [formInput.value]: 0}}}) 
          break;
      }
    }
    else{
      let copyPickedNames
      switch (formInput.dataset.answertype){
        case 'vendor':
          copyPickedNames = JSON.parse(JSON.stringify(pickedNames));
          delete copyPickedNames[formInput.value]
          setPickedNames(copyPickedNames)
          break;
        case 'series':
          copyPickedNames = JSON.parse(JSON.stringify(pickedNames));
          delete copyPickedNames[formInput.dataset.header][formInput.value]
          setPickedNames(copyPickedNames) 
          break;
        case 'model':
          copyPickedNames = JSON.parse(JSON.stringify(pickedNames));
          const [vendorName, seriesName] = formInput.dataset.header.split('/')
          delete copyPickedNames[vendorName][seriesName][formInput.value]
          setPickedNames(copyPickedNames)
          break;
      }
    }
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