import React, { useState, useCallback } from 'react';
import Leaderboard from './components/Leaderboard';
import AddPlayerForm from './components/AddPlayerForm';
import './styles/global.css';
import './styles/layout.css';
import './styles/typography.css';
import './styles/form.css';
import './styles/leaderboard.css';
import './styles/animations.css';
import './styles/buttons.css';
import './styles/modals.css';
import './styles/responsive.css';

const App = () => {
  // Start with no players
  const [players, setPlayers] = useState([]);

  const addPlayer = useCallback((name, sales) => {
    // Prevent duplicate names (case-insensitive)
    if (players.find(player => player.name.toLowerCase() === name.toLowerCase())) {
      alert("Duplicate names are not allowed.");
      return;
    }
    const newSales = parseInt(sales, 10);
    const newPlayer = {
      id: players.length + 1,
      name,
      sales: newSales,
      commission: newSales * 30,
    };
    setPlayers(prev => [...prev, newPlayer]);
  }, [players]);

  const updateSales = useCallback((id, newSales, newName) => {
    setPlayers(prev =>
      prev.map(player =>
        player.id === id
          ? {
              ...player,
              sales: newSales,
              commission: newSales * 30,
              ...(newName !== undefined && { name: newName }),
            }
          : player
      )
    );
  }, []);

  const deletePlayer = useCallback((id) => {
    setPlayers(prev => prev.filter(player => player.id !== id));
  }, []);

  const deleteAllPlayers = useCallback(() => {
    setPlayers([]);
  }, []);

  const resetPlayers = useCallback(() => {
    setPlayers(prev =>
      prev.map(player => ({
        ...player,
        sales: 0,
        commission: 0,
      }))
    );
  }, []);

  const shareOnFacebook = useCallback(() => {
    const url = encodeURIComponent(window.location.href);
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }, []);

  return (
    <div className="app">
      <h1>UA TIKTOK LEADERBOARD</h1>
      <div className="top-but
      tons">
        <button onClick={shareOnFacebook} className="action-button">
          Share on Facebook
        </button>
      </div>
      <AddPlayerForm addPlayer={addPlayer} currentPlayers={players} />
      <Leaderboard 
        players={players} 
        updateSales={updateSales} 
        deletePlayer={deletePlayer}
      />
      <div className="buttons-container">
        <button className="action-button" onClick={resetPlayers}>
          Reset
        </button>
        <button className="action-button" onClick={deleteAllPlayers}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default App;
