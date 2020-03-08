import React from 'react';
import styled from 'styled-components';

const Grid = (props)=>{
    let width=Math.floor(props.rowSquareNum*props.squareWidth)+20 || 0;
    let height=Math.floor(props.rowSquareNum*props.squareWidth) || 0 ;
    let fillColor = props.fillColor || '#000000';
    let addStyle = {width:width,height:height};
    let addEmptyStyle = {height:props.squareWidth,flex:`${props.squareWidth}px`}
    let addFilledStyle = {backgroundColor:fillColor,height:props.squareWidth,flex:`${props.squareWidth}px`}
    let squares = null;
    let matrix = props.matrix;
    function fillPath(event,cell,rowNum,colNum){
        props.mouseentered(event,cell,[rowNum,colNum])
    }
    function clearPath(event,cell,rowNum,colNum){
        props.mouseleft(event,cell,[rowNum,colNum])
    }
    if(matrix.length>0){
        squares = matrix.map((row,rowNum)=>{
            return row.map((cell,colNum)=>{
                return (<div id={`${rowNum}:${colNum}`} onMouseEnter={(event)=>fillPath(event,cell,rowNum,colNum)} onMouseLeave={(event)=>clearPath(event,cell,rowNum,colNum)} key={`${rowNum}:${colNum}`} style={cell?addFilledStyle:addEmptyStyle}></div>)
            })
        })
    }
    return(
        <div id="grid">
            <div>Grid!!</div>
            <StyledDiv id="main-div" style={addStyle}>
                {squares}
            </StyledDiv>
        </div>
    )
}

const StyledDiv = styled.div`
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    border:1px solid black;
    margin:auto;
    div{
        border:1px solid grey;
        border-collapse: collapse;
    }
`;

export default Grid;