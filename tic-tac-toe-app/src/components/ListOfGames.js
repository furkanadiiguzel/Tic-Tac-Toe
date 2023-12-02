import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ListOfGames = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch and set the list of games from local storage or API
    const storedGames = JSON.parse(localStorage.getItem('games')) || [];
    setGames(storedGames);
  }, []);

  const handleGameSelect = (selectedGame) => {
    // Redirect to the Tic Tac Toe game screen with the selected game
    navigate(`/tic-tac-toe/${selectedGame.id}`);
  };

  return (
    <div>
      <h2>List of Games</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <div>
              <strong>Name:</strong> {game.name}
            </div>
            <div>
              <strong>Creator:</strong> {game.creator}
            </div>
            <div>
              <strong>Status:</strong> {game.status}
            </div>
            <div>
              <strong>Highest Score:</strong> {game.highestScore}
            </div>
            <button onClick={() => handleGameSelect(game)}>Select Game</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListOfGames;
