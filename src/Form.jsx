import {useState, useEffect} from 'react'
import Api from './Api.jsx'
import validation from './validation.jsx';

function WideForm({handleSubmit, buttonDisabled, powerW_and_El}){
  return (
    <>
      <form onSubmit={handleSubmit}>
        <table className="table form">
          <thead className='table-header'>
            <tr>
              <th className="td-left" colSpan={4}>Ввод данных:</th>
              <th colSpan={2}><button type='submit' name='submitButton' disabled={buttonDisabled} >Выбрать</button></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='td-left'><label htmlFor='power'>S нагр.</label></td>
              <td>[кВА]</td>
              <td><input className='number-input' type='number' step='any' name='power' id='power'></input></td>

              <td className='td-left'><label htmlFor='elements'>Q батарей (12В)</label></td>
              <td>[шт.]</td>
              <td><input className='number-input' type='number' step='1' name='elements' id='elements'></input></td>
            </tr>

            <tr>
              <td className='td-left'><label htmlFor='cos-fi'>cos(fi):</label></td>
              <td>[-]</td>
              <td><input className='number-input' type='number' step='0.01' max='1' name='cos-fi' id='cos-fi' defaultValue={1}></input></td>

              <td className='td-left'><label htmlFor='groups'>Q групп</label></td>
              <td>[шт.]</td>
              <td><input className='number-input' type='number' step='1' name='groups' defaultValue={1} id='groups'></input></td>
            </tr>

            <tr>
              <td className='td-left'><label htmlFor='efficiency'>КПД инв.</label></td>
              <td>[%]</td>
              <td><input className='number-input' type='number' max='100' step='any' name='efficiency' id='efficiency'></input></td>

              <td className='td-left'><label htmlFor='depth'>Глубина разряда</label></td>
              <td>[В/эл]</td>
              <td><input className='number-input' type='number' step='0.01' max='2' name='depth' id='depth'></input></td>
            </tr>

            <tr>
              <td className='td-left'><label htmlFor='dc_time'>t автономии</label></td>
              <td>[мин.]</td>
              <td><input className='number-input' type='number' step='0.01' name='dc_time' id='dc_time'></input></td>

              <td className='td-left'><label htmlFor='percent'>Допуск</label></td>
              <td>[%]</td>
              <td><input className='number-input' type='number' step='any' name='percent' id='percent'></input></td>
            </tr>

            <tr className='light-blue-bg'>
              <td className='td-left'>P нагр.</td>
              <td>[кВт]</td>
              <td>{typeof powerW_and_El[0] === 'number' ? powerW_and_El[0].toFixed(2) : powerW_and_El[0]}</td>
              <td className='td-left'>P батереи</td>
              <td>[Вт/эл]</td>
              <td>{typeof powerW_and_El[1] === 'number' ? powerW_and_El[1].toFixed(2) : powerW_and_El[1]}</td>
            </tr>
          </tbody>
        </table>        
      </form>
    </>
  )
}

function SlimForm({handleSubmit, buttonDisabled, powerW_and_El}){
  return (
    <>
      <form onSubmit={handleSubmit}>
        <table className="table form">
          <thead className='table-header'>
            <tr>
              <th className="td-left">Ввод данных:</th>
              <th colSpan={2}><button type='submit' name='submitButton' disabled={buttonDisabled} >Выбрать</button></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='td-left'><label htmlFor='power'>S нагр.</label></td>
              <td>[кВА]</td>
              <td><input className='number-input' type='number' step='any' name='power' id='power'></input></td>
            </tr>

            <tr>
              <td className='td-left'><label htmlFor='cos-fi'>cos(fi):</label></td>
              <td>[-]</td>
              <td><input className='number-input' type='number' step='0.01' max='1' name='cos-fi' id='cos-fi' defaultValue={1}></input></td>
            </tr>

            <tr>
              <td className='td-left'><label htmlFor='efficiency'>КПД инв.</label></td>
              <td>[%]</td>
              <td><input className='number-input' type='number' max='100' step='any' name='efficiency' id='efficiency'></input></td>
            </tr>

            <tr>
              <td className='td-left'><label htmlFor='dc_time'>t автономии</label></td>
              <td>[мин.]</td>
              <td><input className='number-input' type='number' step='0.01' name='dc_time' id='dc_time'></input></td>
            </tr>

            <tr>
              <td className='td-left'><label htmlFor='elements'>Q батарей (12В)</label></td>
              <td>[шт.]</td>
              <td><input className='number-input' type='number' step='1' name='elements' id='elements'></input></td>
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

            <tr>
              <td className='td-left'><label htmlFor='percent'>Допуск</label></td>
              <td>[%]</td>
              <td><input className='number-input' type='number' step='any' name='percent' id='percent'></input></td>
            </tr>

            <tr className='light-blue-bg'>
              <td className='td-left'>P нагр.</td>
              <td>[кВт]</td>
              <td>{typeof powerW_and_El[0] === 'number' ? powerW_and_El[0].toFixed(2) : powerW_and_El[0]}</td>
            </tr>
            <tr className='light-blue-bg'>
              <td className='td-left'>P батереи</td>
              <td>[Вт/эл]</td>
              <td>{typeof powerW_and_El[1] === 'number' ? powerW_and_El[1].toFixed(2) : powerW_and_El[1]}</td>
            </tr>

          </tbody>
        </table>        
      </form>
    </>
  )
}

function Form({setBatteries, setColumnClasses, windowWidth}) {
  let api = new Api;
  
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [powerW_and_El, setPowerW_and_El] = useState(['\u2013', '\u2013'])


  function handleSubmit(event){
    event.preventDefault();
  
    let form = event.target;
    let formData = {};
    let n = 0;
    while (form[n] !== undefined){
      formData[form[n].name] = form[n].value;
      n++;
    }

    formData.elements *= 6
    delete formData.submitButton
    let powerW = formData['power'] * formData['cos-fi']
    setPowerW_and_El([powerW, powerW * 100 * 1000 / (formData['groups'] * formData['elements'] * formData['efficiency'])])
    
    formData.power *= 1000    

    setButtonDisabled(true)
    api.calcBatteries(formData).then(result => {let v_res = validation(result); setBatteries(v_res[0]); setColumnClasses(v_res[1]); setButtonDisabled(false);})

  }

  if (windowWidth >= 650){
    return (
      <>
      <WideForm handleSubmit={handleSubmit} buttonDisabled={buttonDisabled} powerW_and_El={powerW_and_El}></WideForm>
      </>
    )
  }
  else{
    return (
      <>
      <SlimForm handleSubmit={handleSubmit} buttonDisabled={buttonDisabled} powerW_and_El={powerW_and_El}></SlimForm>
      </>
    )
  }
}

export default Form
