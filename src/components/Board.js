import React, { useState } from "react";
import Cell from "./Cell";

export default function Board() {
  const [cell, setCell] = useState(Array(9).fill("")); //state cell
  const [finish, setfinish] = useState(false); //penentu selesai atau belum
  const [isWinner, isSetWinner] = useState(); //state winner
  const [turn, setTurn] = useState(1); //langkah ke-

  let emptyArray = [];

  const handleClicked = (i) => {
    if (finish) {
      alert("game completed");
      return "";
    }
    if (cell[i] !== "") {
      alert("already filled");
      return "";
    }
    const square = [...cell];
    square[i] = "X";
    computerMove(square, i);
  };

  const computerMove = (square, i) => {
    cell.forEach((c, index) => {
      if (c === "") {
        emptyArray.push(index);
      }
    });
    if (emptyArray.length > 1) {
      let random = emptyArray[Math.floor(Math.random() * emptyArray.length)];
      while (i === random) {
        random = emptyArray[Math.floor(Math.random() * emptyArray.length)];
      }
      square[random] = "O";
    }
    setTurn(turn + 1);
    checkDraw(turn);
    checkWinner(square);
    setCell(square);
  };

  const checkWinner = (cell) => {
    const pattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < pattern.length; i++) {
      const cek = [...pattern[i]];
      if (
        cell[cek[0]] &&
        cell[cek[0]] === cell[cek[1]] &&
        cell[cek[0]] === cell[cek[2]]
      ) {
        setfinish(true);
        isSetWinner(cell[cek[0]]);
      }
    }
  };
  const checkDraw = (turn) => {
    if (turn === 5) {
      setfinish(true);
      isSetWinner("draw");
    }
  };

  const restart = () => {
    setCell(Array(9).fill(""));
    setTurn(1);
    emptyArray = [];
    setfinish(false);
    isSetWinner(null);
  };

  return (
    <div>
      <div className="board">
        <div className="display-row">
          <Cell render={cell[0]} click={() => handleClicked(0)} />
          <Cell render={cell[1]} click={() => handleClicked(1)} />
          <Cell render={cell[2]} click={() => handleClicked(2)} />
        </div>
        <div className="display-row">
          <Cell render={cell[3]} click={() => handleClicked(3)} />
          <Cell render={cell[4]} click={() => handleClicked(4)} />
          <Cell render={cell[5]} click={() => handleClicked(5)} />
        </div>
        <div className="display-row">
          <Cell render={cell[6]} click={() => handleClicked(6)} />
          <Cell render={cell[7]} click={() => handleClicked(7)} />
          <Cell render={cell[8]} click={() => handleClicked(8)} />
        </div>
        <p>Player : X</p>
        <p>Computer : O</p>
        {isWinner && <p className="winner">Winner : {isWinner} </p>}
        <button onClick={() => restart()} className="restart-button">
          Restart
        </button>
      </div>
    </div>
  );
}
