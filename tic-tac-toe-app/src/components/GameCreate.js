import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GameCreate = () => {
  const [gameName, setGameName] = useState('');
  const [boardSize, setBoardSize] = useState(3); // Default board size is 3
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF'); // Default background color is white
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Save game data in local storage or context
    const gameData = {
      name: gameName,
      size: boardSize,
      color: backgroundColor,
      // Add other relevant game data
    };

    // Save game data to local storage
    localStorage.setItem('currentGame', JSON.stringify(gameData));

    // Redirect to the List of Games screen
    navigate('/list-of-games');
  };

  return (
    <div>
      <h2>Create a New Game</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Game Name:
          <input
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            required
          />
        </label>

        <label>
          Board Size:
          <select
            value={boardSize}
            onChange={(e) => setBoardSize(parseInt(e.target.value))}
          >
            <option value={3}>3x3</option>
            <option value={4}>4x4</option>
            <option value={5}>5x5</option>
          </select>
        </label>

        <label>
          Board Background Color:
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </label>

        <button type="submit">Create Game</button>
      </form>
    </div>
  );
};

export default GameCreate;
