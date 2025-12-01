import React, { useState } from 'react';
import './App.css';

// Componente para um Quadrado individual
function Square({ value, onSquareClick, isWinningSquare }) {
  return (
    <button 
      className={`square ${isWinningSquare ? 'winner' : ''}`} 
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default function Game() {
  
  const [squares, setSquares] = useState(Array(9).fill(null));
  
  const [xIsNext, setXIsNext] = useState(true);

  
  const result = calculateWinner(squares);
  const winner = result?.winner;
  const winningLine = result?.line || [];

  
  function handleClick(i) {
    
    if (squares[i] || winner) {
      return;
    }

    
    const nextSquares = squares.slice();
    
    
    nextSquares[i] = xIsNext ? 'X' : 'O';

    
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  
  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  
  let status;
  if (winner) {
    status = 'Vencedor: ' + winner;
  } else if (!squares.includes(null)) {
    status = 'Empate!';
  } else {
    status = 'Próximo jogador: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="status">{status}</div>
      
      <div className="board">
        {squares.map((value, index) => (
          <Square 
            key={index} 
            value={value} 
            onSquareClick={() => handleClick(index)}
            isWinningSquare={winningLine.includes(index)}
          />
        ))}
      </div>

      <button className="reset-button" onClick={resetGame}>
        Reiniciar Jogo
      </button>
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
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}