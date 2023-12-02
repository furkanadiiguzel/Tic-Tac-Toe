import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import

const NameEntry = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate(); // Updated import

  const handleNameSubmit = (e) => {
    e.preventDefault();
    
    // Check if the user has entered a name
    if (userName.trim() !== '') {
      // Save the user's name in local storage
      localStorage.setItem('userName', userName);
      
      // Redirect to Game Create screen
      navigate('/game-create'); // Updated navigation
    }
  };

  // Check if the user has entered the game before
  const storedUserName = localStorage.getItem('userName');

  return (
    <div>
      {storedUserName ? (
        <p>Welcome {storedUserName}!</p>
      ) : (
        <p>Please enter your name to start a game.</p>
      )}

      <form onSubmit={handleNameSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
};

export default NameEntry;
