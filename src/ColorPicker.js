import React from 'react';
const ColorPicker = (props)=>{
    let fillColor = props.fillColor || '#000000';
    let hoverColor = props.hoverColor || '#000000';
    return(
        <div>
            <div>ColorPicker</div>
            filled color:<input name="fillColor" type="color" value={fillColor} onChange={(event)=>props.colorchanged(event)}/>
            hover color:<input name="hoverColor" type="color" value={hoverColor} onChange={(event)=>props.colorchanged(event)}/>
        </div>
    )
}

export default ColorPicker;