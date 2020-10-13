import React, { Component } from "react";
import Board from "../Board/Board";
import "./Game.css";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        player : squares[a],
        lineWin : lines[i]
      }
    }
  }
  if (!squares.includes(null)){
    return {
      draw : true
    }
  }
  return {
    player : null,
    lineWin : null
  };
}

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      isASC: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares).player || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          lastIndex: i,
        },
      ]),

      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }
  handleSort() {
    this.setState({
      isASC: !this.state.isASC
    });
  }
  render() {
    const { history, stepNumber, isASC } = this.state;
    const current = history[stepNumber];
    const statusGame = calculateWinner(current.squares);
    const lineWin = calculateWinner(current.squares).lineWin;
    
    const moves = history.map((step, move) => {
      const lastIndex = step.lastIndex;
      const col = 1 + (lastIndex % 3);
      const row = 1 + Math.floor(lastIndex / 3);
      const desc = move
        ? `Go to move #${move} at (${col}, ${row})`
        : "Go to game start";
      return (
        <li key={move}>
          <button
            className={move === stepNumber ? "move-list-item-selected" : ""}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    if (!isASC) {
      moves.reverse();
    }

    let status;
    if (statusGame.draw) {
      status = "Draw";
    } else if (statusGame.player) {
      status = "Winner : " + statusGame.player;
    }
    else{
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className = "div-game">
        <div className="game">
        <div className="game-board">
        <div className="status">{status}</div>
          <Board
            squares={current.squares}
            currentIndex={!(status==='Draw') ? current.lastIndex : null}
            lineWin = {lineWin}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <button className="toggle" onClick={() => this.handleSort()}>
            {isASC ? "Descending" : "Ascending"}
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
      </div>
      
    );
  }
}
