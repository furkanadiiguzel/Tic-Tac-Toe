import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/TicTacToe.css';

const TicTacToe = ({ bgColor, boardSize }) => {

  const [initialBoard, setInitialBoard] = useState(Array(boardSize * boardSize).fill(''));
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [currentTurn, setCurrentTurn] = useState('X');
  const [gameHistory, setGameHistory] = useState([]);

  const updateGameHistory = useCallback((winner) => {
    const newGame = {
      date: new Date().toLocaleDateString(),
      playerName: localStorage.getItem('playerName'),
      winner: winner === 'O' ? 'AI' : winner === 'X' ? 'Player' : 'Draw',
    };
    setGameHistory((prevHistory) => [...prevHistory, newGame]);
    localStorage.setItem('gameHistory', JSON.stringify([...gameHistory, newGame]));
  }, [setGameHistory, gameHistory]);

  const calculateWinner = useCallback((squares) => {
    const lines = [];
    const boardSize = Math.sqrt(squares.length);
  
    // Rows and columns
    for (let i = 0; i < boardSize; i++) {
      lines.push(Array.from({ length: boardSize }, (_, index) => i * boardSize + index));
      lines.push(Array.from({ length: boardSize }, (_, index) => i + index * boardSize));
    }
  
    // Diagonals
    lines.push(Array.from({ length: boardSize }, (_, index) => index * (boardSize + 1)));
    lines.push(Array.from({ length: boardSize }, (_, index) => (index + 1) * (boardSize - 1)));
  
    for (const line of lines) {
      const squaresInLine = line.map((index) => squares[index]);
      const uniqueSquares = [...new Set(squaresInLine)];
  
      if (uniqueSquares.length === 1 && uniqueSquares[0] !== '') {
        return uniqueSquares[0];
      }
    }
  
    // Check for a draw
    if (squares.every((square) => square !== '')) {
      return 'Draw';
    }
  
    return null;
  }, []);
  

  const handleSquareClick = async (index) => {
    if (!gameOver && board[index] === '' && currentPlayer === 'X') {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;

      setBoard(newBoard);

      const winner = calculateWinner(newBoard);
      if (winner || newBoard.every((square) => square !== '')) {
        setGameOver(true);
        setWinner(winner);
        updateGameHistory(winner);
        return; // Stop the game
      }

      setCurrentPlayer('O');
      setCurrentTurn('O');
    }
  };

  useEffect(() => {
    const makeAssistantMove = async () => {
      console.log('Making assistant move...');
      if (!gameOver && currentPlayer === 'O') {
        try {
          const response = await axios.post('http://localhost:3001/makeMove', { board });
          console.log('Assistant move response:', response.data);

          const gptMove = response.data.move;
          const gptBoard = JSON.parse(gptMove);

          const winner = calculateWinner(gptBoard);
          if (winner || gptBoard.every((square) => square !== '')) {
            setGameOver(true);
            setWinner(winner);
            updateGameHistory(winner);
            return; // Stop the game
          }

          setBoard(gptBoard);
          setCurrentPlayer('X');
          setCurrentTurn('X');
        } catch (error) {
          console.error('Error making move:', error);
        }
      }
    };
    calculateWinner(initialBoard); 

    makeAssistantMove();
  }, [board, currentPlayer, gameOver, calculateWinner, updateGameHistory]);

  const renderSquare = (index) => {
    return (
      <button
        className="square"
        style={{
          cursor: gameOver ? 'default' : 'pointer',
          backgroundColor: gameOver && !winner ? 'inherit' : bgColor,
        }}
        onClick={() => handleSquareClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  return (
    <div className={`board-container ${gameOver ? 'game-over' : ''}`}>
      <div className="board">
        <div className="current-turn">{`Current Turn: ${currentTurn}`}</div>
        {[...Array(boardSize)].map((_, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {[...Array(boardSize)].map((_, colIndex) => (
              renderSquare(rowIndex * boardSize + colIndex)
            ))}
          </div>
        ))}
        {gameOver && (
          <div className="game-result">
            {winner ? `${winner} WON!` : `It's a Draw!`}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;
