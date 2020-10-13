import React, { Component } from "react";
import Square from "../Square/Square";
import "./Board.css";


export default class Board extends Component {
  renderSquare(i) {
    const {currentIndex, lineWin} = this.props;
    return (
      <Square
        value={this.props.squares[i]}
        squareAt ={i}
        key={i}
        currentIndex={currentIndex}
        highlight={lineWin && lineWin.includes(i)}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  render() {
    const sizeOfBoard = 3;
    let squares = [];
    for(let i=0; i<sizeOfBoard; ++i) {
      let row = [];
      for(let j=0; j<sizeOfBoard; ++j) {
        row = [...row,this.renderSquare(i * sizeOfBoard + j)];
      }
      squares=[...squares,(<div key={i} className="board-row">{row}</div>)];
    }

    return (
      <div>{squares}</div>
    );
  }
}
