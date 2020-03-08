import React, { Component } from 'react';
import './App.css';
import Slider from './Slider';
import Matrix from './Matrix';
import Grid from './Grid';
import ColorPicker from './ColorPicker';
import { ThemeConsumer } from 'styled-components';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      matrixSize : 0,
      generatedMatrix:'',
      matrix:[],
      graph:{},
      fillColor:'#ffff00',
      hoverColor:'#ff0000',
      connectedNodes:[],
      connectedNodesCount:0
    }
    this.onChangeOfSlider = this.onChangeOfSlider.bind(this);
    this.onColorChange = this.onColorChange.bind(this);
    this.mouseentered = this.mouseentered.bind(this);
    this.mouseleft = this.mouseleft.bind(this);
  }
  findConnectingNodes(mapObj,cell){
    let row=cell[0];
    let col = cell[1];
    let count = 0;
    let nodes = [];
    Object.keys(mapObj).forEach((item,index)=>{
        if(!(item==cell[1])){
            if(mapObj[item].indexOf(row)!=-1){
                count = count+1;
                nodes.push([index,row]);
                
            }
            if(mapObj[item].indexOf(col)!=-1){
                count = count+1;
                nodes.push([index,col]);
            }
            if(item==cell[0] && mapObj[item].indexOf(col)!=-1){
                count = count+1;
                nodes.push([index,col]);
            }
        }
    });
    this.setState({connectedNodes:nodes,connectedNodesCount:count});
}
fillColorsInPath(nodes){
  console.log(nodes);
  Object.keys(nodes).forEach((key)=>{
    console.log(nodes[key]);
    nodes[key].forEach((item)=>{
      let ele = document.getElementById(`${key}:${item}`);
      if(ele)
      ele.style.backgroundColor = '#ffff00'; 
    })
  })
}
  mouseentered = (event,value,cellPos)=>{
    if(value){
      this.findConnectingNodes(this.state.graph,cellPos);
      event.target.style.backgroundColor = this.state.hoverColor;
      document.getElementById(event.target.id).textContent = this.state.connectedNodesCount;
      // this.fillColorsInPath(this.state.connectedNodes);

    }
    
  }
  mouseleft = (event,value,cellPos)=>{
    if(value){
      document.getElementById(event.target.id).textContent = '';
      event.target.style.backgroundColor = this.state.fillColor;
    }
    
  }
  generateMatrix = (value)=>{
    function getRandomMatrix(matrixSize) {
      let rowSquareNum = +matrixSize;
      let matrix = [];
      for (let j = 0; j < rowSquareNum; j++) {
        let row = [];
        for (let i = 0; i < rowSquareNum; i++) {
          row.push(Math.round(Math.random()));
        }
        matrix.push(row);
      }
      return matrix;
    }
    function buildGraphMap(matrix){
      let mapObj = {};
      let mapping = matrix.map((row,index)=>{
          return row.map((item,i)=>{
              if(item===1 && (i!=index) ){
                  return i;
              }
          })
      });
      mapping.forEach((row,index)=>{
          if(!mapObj[index]){
              mapObj[index] = [];
          }
          mapObj[index] = row.filter((item)=>(item!=undefined));
      })
      return mapObj;
  }
    let matrix = getRandomMatrix(value);
    let graph = buildGraphMap(matrix);
    this.setState({graph:graph});
    let rowString = matrix.map((row) => {
      let numStr = row.map((item) => {
        return item;
      });
      return '[' + numStr + '],' + '\n';
    })
    let colString = '['+ '\n';
    rowString.forEach((item) => {
      colString = colString + item;
    })
    colString = colString + ']';
    this.setState({generatedMatrix:colString});
    this.setState({matrixSize:value});
    this.setState({matrix:matrix});
}
  onColorChange = (event)=>{
    this.setState({[event.target.name]:event.target.value});
  }
  onChangeOfSlider = (event)=>{
      this.generateMatrix(event.target.value);

  }
  render(){
    return (
      <div className="App">
        <div>Grid Game</div>
        <hr />
        <Slider sliderValue={this.state.matrixSize}  changed={this.onChangeOfSlider}/>
        <hr />
        <Matrix  matrix={this.state.generatedMatrix}/>
        <hr />
        <ColorPicker colorchanged={this.onColorChange} fillColor={this.state.fillColor} hoverColor={this.state.hoverColor}/>
        <hr />
        <Grid mouseentered={this.mouseentered} mouseleft={this.mouseleft} fillColor={this.state.fillColor} hoverColor={this.state.hoverColor} matrix={this.state.matrix} rowSquareNum={this.state.matrixSize} squareWidth="50"/>
        <hr />
      </div>
    );
  }

}

export default App;
