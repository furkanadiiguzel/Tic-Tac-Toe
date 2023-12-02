import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NameEntry from './components/NameEntry';
import GameCreate from './components/GameCreate';
import ListOfGames from './components/ListOfGames';
import TicTacToe from './components/TicTacToe';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<NameEntry />} />
          <Route path="/game-create" element={<GameCreate />} />
          <Route path="/list-of-games" element={<ListOfGames />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          {/* Add routes for other components */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
