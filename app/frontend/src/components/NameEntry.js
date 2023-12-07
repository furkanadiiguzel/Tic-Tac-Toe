import React, { useState } from 'react';
import '../styles/NameEntry.css'

const NameEntry = ({ onNameEntered }) => {
  const [name, setName] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEnterClick = () => {
    if (name.trim() !== '') {
      localStorage.setItem('playerName', name);
      onNameEntered(name);
    }
  };

  return (
    <div className="name-entry-container">
      <h2>Enter Your Name</h2>
      <input type="text" value={name} onChange={handleNameChange} />
      <button onClick={handleEnterClick}>Enter</button>
    </div>
  );
};



export default NameEntry;
