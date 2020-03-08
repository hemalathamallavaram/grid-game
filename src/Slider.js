import React from 'react';

const Slider = (props)=>{
    return(
        <React.Fragment>
            <div>Slider</div>
            <input id="slider" type="range" min="2" step="1"  max="9" value={props.sliderValue} onChange={(event)=>props.changed(event)}/>
        </React.Fragment>
    )
}

export default Slider;