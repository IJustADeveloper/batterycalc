import { useState } from 'react'

function Results({children, headerColor='maroon', headerNum=2}){
    const [displayedComponentNum, setDisplayedComponentNum] = useState(1);
    
    return(
        <>
            <div className='battsize-results-container'>
                <div className='numbered-header'>
                    <div className={'number-box '+headerColor}>{headerNum}</div>
                    <p>Results:</p>
                    <div className='switcher'>
                        <div className={"option-container " + ( displayedComponentNum === 1 ? 'checked' : '')} onClick={()=>{setDisplayedComponentNum(1)}}>Table</div>
                        <div className={"option-container " + ( displayedComponentNum === 2 ? 'checked' : '')} onClick={()=>{setDisplayedComponentNum(2)}}>Graph</div>
                    </div>
                </div>
                <div className='results-content-container' 
                    style={{
                        display: displayedComponentNum === 1 ? 'block' : 'none',
                        position: displayedComponentNum === 1 ? 'static' : 'absolute',
                    }}>
                    {children[0]}
                </div>
                <div className='results-content-container' 
                    style={{
                        display: displayedComponentNum === 2 ? 'block' : 'none',
                        position: displayedComponentNum === 2 ? 'static' : 'absolute', overflow: 'hidden',
                    }}>
                    {children[1]}
                </div>
            </div>
        </>
    )

}

export default Results