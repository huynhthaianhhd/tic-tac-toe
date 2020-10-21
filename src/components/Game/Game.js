import React, { useState } from "react";
import Board from "../Board/Board";
import "./Game.css";
function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);

  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [isASC, setIsASC] = useState(true);

  const handleClick = (i) => {
    const historyCurr = history.slice(0, stepNumber + 1);
    const current = historyCurr[historyCurr.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares).player || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(
      historyCurr.concat([
        {
          squares: squares,
          lastIndex: i,
        },
      ])
    );
    setStepNumber(historyCurr.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };
  const handleSort = () => {
    setIsASC(!isASC);
  };

  const current = history[stepNumber];
  const statusGame = calculateWinner(current.squares);
  const lineWin = statusGame.lineWin;

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
          onClick={() => jumpTo(move)}
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
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="div-game">
      <div className="game">
        <div className="game-board">
          <div className="status">{status}</div>
          <Board
            squares={current.squares}
            currentIndex={!(status === "Draw") ? current.lastIndex : null}
            lineWin={lineWin}
            onClick={(i) => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <button className="toggle" onClick={() => handleSort()}>
            {isASC ? "Descending" : "Ascending"}
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
}
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
        player: squares[a],
        lineWin: lines[i],
      };
    }
  }
  if (!squares.includes(null)) {
    return {
      draw: true,
    };
  }
  return {
    player: null,
    lineWin: null,
  };
}

export default Game;
