function MultipleChoiceWithHeaders({ header, answertype, data }) {

    let tbody = []
    for (const [header, answers] of Object.entries(data)) {
        tbody.push(<tr key={header}><td colSpan={2} className="header">{header}</td></tr>)

        Object.entries(answers).forEach(([answer, checked]) => {
            tbody.push(
                <tr key={header + answer}>
                    <td className='multiple-choice-list-answer-label'><label htmlFor={answer}>{answer}</label></td>
                    <td><input data-answertype={answertype} data-header={header} defaultChecked={checked} type='checkbox' id={answer} value={answer}></input></td>
                </tr>
            )
        })
    }

    return (
        <>
            <div className='multiple-choice-container'>
                <div className='multiple-choice-header'>
                    {header}
                </div>

                <div className='multiple-choice-list-container'>
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

export default MultipleChoiceWithHeaders