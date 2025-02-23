import {useState, useEffect} from 'react'
import Api from './Api.jsx'
import SystemRuntimeEstimatorValidation from './SystemRuntimeEstimatorValidation.jsx'

// header - header that will be displayed on top the MC
// answerType - naming of a group to which all MC answers relate, can be used to distinct multiple MC groups
// data - object, in which keys are headers for groups of MC answers, and values are arrays of MC labels/answers
function MultipleChoiceWithHeaders({header, answertype, data}){

  let tbody = []
  for (const [header, answers] of Object.entries(data)){
    tbody.push(<tr key={header}><td colSpan={2} className="multiple-choice-list-header">{header}</td></tr>)

    answers.forEach(answer=>{
      tbody.push(
        <tr key={header+answer}>
          <td className='multiple-choice-list-answer-label'><label htmlFor={answer}>{answer}</label></td>
          <td><input data-answertype={answertype} data-header={header} type='checkbox' id={answer} value={answer}></input></td>
        </tr>
      )
    })
  }

  return (
    <>
      <div className='box multiple-choice-card border-light-blue border-thick'>
        <div className='box underline blue-bg'>
          <h3 className='multiple-choice-header'>{header}</h3>
        </div>  

        <div className='box multiple-choice-list-container vertical-scroll'>
          <table className='multiple-choice-list-table'>
            <tbody>
              {tbody}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function Form({handleSubmit, buttonDisabled, powerEl, names}){

  const [pickedNames, setPickedNames] = useState({});
  const [showingSeries, setShowingSeries] = useState({});
  const [showingModels, setShowingModels] = useState({});

  function handleChangeNames(event){
    let formInput = event.target
    console.log(event)

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


  function handleChangeParams(event){
    let formInput = event.target
    let form = formInput.form

    if (formInput.id === 'powerS'){
      form.elements.powerP.value = formInput.value * form.elements.cos_fi.value
    }
    else if(formInput.id === 'cos_fi'){
      form.elements.powerP.value = formInput.value * form.elements.powerS.value
    }
    else if(formInput.id === 'powerP'){
      if (formInput.value / form.elements.powerS.value > 1){
        form.elements.cos_fi.value = 1
        form.elements.powerS.value = formInput.value
      }
      else{
        form.elements.cos_fi.value = formInput.value / form.elements.powerS.value
      }
    }
  }

  function preHandleSubmit(event){
    event.preventDefault();
  
    let form = event.target;
    let formData = {};
    let n = 0;
    while (form[n] !== undefined){
      formData[form[n].name] = form[n].value;
      n++;
    }

    formData.bElements *= 6
    delete formData.submitButton
    let powerW = formData.powerP * 1000
    formData.power_el = powerW * 100 / (formData.groups * formData.bElements * formData.efficiency)
    formData.names = JSON.parse(JSON.stringify(pickedNames))

    handleSubmit(formData)
  }

  return (
    <>
        <div className='flex' style={{marginBottom: '20px'}}>
          <form onChange={handleChangeNames}>
            <div className='flex'>
              <MultipleChoiceWithHeaders header='Вендор' answertype={'vendor'} data={{'Вендоры': Object.keys(names)}}/>
              <MultipleChoiceWithHeaders header='Серия' answertype={'series'} data={showingSeries}/>
              <MultipleChoiceWithHeaders header='Модель' answertype={'model'} data={showingModels}/>
            </div>
          </form>
          <form onSubmit={preHandleSubmit} onChange={handleChangeParams}>
            <div className='box flex col border-light-blue border-thick' style={{height: '100%'}}>
              <div className='box underline blue-bg'>
                <h3 className='multiple-choice-header'>Ввод данных:</h3>
              </div>  
              <table className='table form' style={{flex: 1, marginBottom: 0}}>
                <tbody>
                  <tr>
                    <td className='td-left'><label htmlFor='powerS'>S нагр.</label></td>
                    <td>[кВА]</td>
                    <td><input className='number-input' type='number' step='any' name='powerS' id='powerS'></input></td>
                  </tr>

                  <tr>
                    <td className='td-left'><label htmlFor='cos_fi'>cos(fi)</label></td>
                    <td>[-]</td>
                    <td><input className='number-input' type='number' step='0.01' max='1' name='cos_fi' id='cos_fi' defaultValue={1}></input></td>
                  </tr>

                  <tr>
                    <td className='td-left'><label htmlFor='powerP'>P нагр.</label></td>
                    <td>[кВт]</td>
                    <td><input className='number-input' type='number' step='any' name='powerP' id='powerP'></input></td>                
                  </tr>

                  <tr>
                    <td className='td-left'><label htmlFor='efficiency'>КПД инв.</label></td>
                    <td>[%]</td>
                    <td><input className='number-input' type='number' max='100' step='any' name='efficiency' id='efficiency'></input></td>
                  </tr>

                  <tr>
                    <td className='td-left'><label htmlFor='bElements'>Q батарей (12В)</label></td>
                    <td>[шт.]</td>
                    <td><input className='number-input' type='number' step='1' name='bElements' id='bElements'></input></td>
                  </tr>

                  <tr>
                    <td className='td-left'><label htmlFor='groups'>Q групп</label></td>
                    <td>[шт.]</td>
                    <td><input className='number-input' type='number' step='1' name='groups' defaultValue={1} id='groups'></input></td>
                  </tr>

                  <tr>
                    <td className='td-left'><label htmlFor='depth'>Глубина разряда</label></td>
                    <td>[В/эл]</td>
                    <td><input className='number-input' type='number' step='0.01' max='2' name='depth' id='depth'></input></td>
                  </tr>

                  <tr className='light-blue-bg'> 
                    <td className='td-left'>P батареи</td>
                    <td>[Вт/эл]</td>
                    <td>{typeof powerEl === 'number' ? powerEl.toFixed(2) : powerEl}</td>
                    <td colSpan={2}>
                      <button type='submit' name='submitButton' disabled={buttonDisabled} >Выбрать</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
        </div>
    </>
  )
}

function SystemRuntimeEstimateForm({setBatteries, setColumnClasses, windowWidth}) {
  let api = new Api;
  
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [powerEl, setPowerEl] = useState('\u2013')

  const [namesLoaded, setNamesLoaded] = useState(false)
  const [names, setNames] = useState(null)

  useEffect(()=>{
    api.getNames().then(result => {setNames(result.data); setNamesLoaded(true);})
  }, []);

  function handleSubmit(formData){
    setButtonDisabled(true)
    setPowerEl(formData.power_el)
    api.systemRuntimeEstimate(formData).then(result => {let v_res = SystemRuntimeEstimatorValidation(result); setBatteries(v_res[0]); setColumnClasses(v_res[1]); setButtonDisabled(false);})
  }

  if (namesLoaded){
    return (
      <>
      <Form handleSubmit={handleSubmit} buttonDisabled={buttonDisabled} setButtonDisabled={setButtonDisabled} powerEl={powerEl} names={names}/>
      </>
    )
  }
}

export default SystemRuntimeEstimateForm