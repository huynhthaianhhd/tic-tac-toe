import React from "react";
import Square from "../Square/Square";
import "./Board.css";
function Board(props) {
  const renderSquare = (i) => {
    const { currentIndex, lineWin } = props;
    return (
      <Square
        value={props.squares[i]}
        squareAt={i}
        key={i}
        currentIndex={currentIndex}
        highlight={lineWin && lineWin.includes(i)}
        onClick={() => props.onClick(i)}
      />
    );
  };
  const sizeOfBoard = 3;
  let squares = [];
  for (let i = 0; i < sizeOfBoard; ++i) {
    let row = [];
    for (let j = 0; j < sizeOfBoard; ++j) {
      row = [...row, renderSquare(i * sizeOfBoard + j)];
    }
    squares = [
      ...squares,
      <div key={i} className="board-row">
        {row}
      </div>,
    ];
  }

  return <div>{squares}</div>;
}

export default Board;
