import React, { useState, useEffect } from 'react';
import TicTacToe from './TicTacToe';
import '../styles/CreateGame.css'

const CreateGame = ({ onGameCreated, onBgColorChange }) => {
  const [boardSize, setBoardSize] = useState(3);
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [gameHistory, setGameHistory] = useState([]);
  const [gameCreated, setGameCreated] = useState(false);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];
    setGameHistory(storedHistory);
  }, []);

  const handleBoardSizeChange = (event) => {
    setBoardSize(parseInt(event.target.value, 10));
    localStorage.setItem('boardSize', parseInt(event.target.value, 10));
  };

  const handleBgColorChange = (event) => {
    const newColor = event.target.value;
    setBgColor(newColor);
    onBgColorChange(newColor);
  };
 
  const handleCreateGameClick = () => {
    onGameCreated(boardSize, bgColor);
    const newGame = {
      date: new Date().toLocaleDateString(),
      playerName: localStorage.getItem('playerName'),
      winner: null,
    };
    setGameHistory([...gameHistory, newGame]);
    localStorage.setItem('gameHistory', JSON.stringify([...gameHistory, newGame]));
    setGameCreated(true);
  };

  return (
    <div className="create-game-container">
      <h2>Create Your Game</h2>
      <label>
        Board Size:
        <select value={boardSize} onChange={handleBoardSizeChange}>
          <option value={3}>3x3</option>
          <option value={4}>4x4</option>
          <option value={5}>5x5</option>
        </select>
      </label>
      <br />
      <label>
        Board Color:
        <input type="color" value={bgColor} onChange={handleBgColorChange} />
      </label>
      <br />
      <button onClick={handleCreateGameClick}>Create Game</button>
      <h3>Game History</h3>
      <ul>
        {gameHistory.map((game, index) => (
          <li key={index}>
            {`${game.date} - ${game.playerName} - Winner: ${game.winner || 'Draw'}`}
          </li>
        )).reverse()}
      </ul>

      {gameCreated && <TicTacToe boardSize={boardSize} bgColor={bgColor} />}
    </div>
  );
};
export default CreateGame;