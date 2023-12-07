import React, { useState } from 'react';
import NameEntry from './components/NameEntry';
import CreateGame from './components/CreateGame';
import TicTacToe from './components/TicTacToe';

const App = () => {
  const [playerName, setPlayerName] = useState(localStorage.getItem('playerName') || '');
  const [boardSize, setBoardSize] = useState(null);
  const [bgColor, setBgColor] = useState(null);

  const handleNameEntered = (name) => {
    setPlayerName(name);
  };

  const handleGameCreated = (size, color) => {
    setBoardSize(size);
    setBgColor(color);
  };

  const handleBgColorChange = (color) => {
    setBgColor(color);
  };

  return (
    <div>
      {!playerName && <NameEntry onNameEntered={handleNameEntered} />}
      {playerName && !boardSize && <CreateGame onGameCreated={handleGameCreated} onBgColorChange={handleBgColorChange} />}
      {playerName && boardSize && bgColor && (
        <TicTacToe playerName={playerName} boardSize={boardSize} bgColor={bgColor} />
      )}
    </div>
  );
};

export default App;
