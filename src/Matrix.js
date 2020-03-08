import React from 'react';

const Matrix = (props)=>{
    return(
        <React.Fragment>
            <div id="matrix">
                <div>Generated Matrix</div>
                <p id="matrix-print">
                    {props.matrix}
                </p>
            </div>

        </React.Fragment>
        

    )
}

export default Matrix;