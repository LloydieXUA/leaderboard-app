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

const calculateCommissionAndSalary = (sales) => {
  if (sales >= 550) return { level: 'Very Elite', salary: 15000, commissionPerShirt: 40, quota: 550 };
  if (sales >= 530) return { level: 'Elite', salary: 14000, commissionPerShirt: 35, quota: 530 };
  if (sales >= 500) return { level: 'Pro', salary: 13000, commissionPerShirt: 35, quota: 500 };
  if (sales >= 450) return { level: 'Semi-Pro', salary: 12500, commissionPerShirt: 30, quota: 450 };
  if (sales >= 400) return { level: 'Rising Star', salary: 12000, commissionPerShirt: 30, quota: 400 };
  if (sales >= 350) return { level: 'Star', salary: 11500, commissionPerShirt: 25, quota: 350 };
  if (sales >= 300) return { level: 'Closer', salary: 10000, commissionPerShirt: 25, quota: 300 };
  if (sales >= 200) return { level: 'Rookie', salary: 5000, commissionPerShirt: 0, quota: 200 };
  return { level: 'Rookie', salary: 5000, commissionPerShirt: 0, quota: 200 }; // Default for less than 200 sales
};

const App = () => {
  const [players, setPlayers] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false); // State to toggle collapse
  const [showPayout, setShowPayout] = useState(false);

  const addPlayer = useCallback((name, sales) => {
    if (players.find(player => player.name.toLowerCase() === name.toLowerCase())) {
      alert("Duplicate names are not allowed.");
      return;
    }
    const newSales = parseInt(sales, 10);
    const { level, salary, commissionPerShirt, quota } = calculateCommissionAndSalary(newSales);
    const totalCommission = newSales >= quota ? newSales * commissionPerShirt : 0;
    const totalIncome = salary + totalCommission;
    const newPlayer = {
      id: players.length + 1,
      name,
      sales: newSales,
      level,
      salary,
      commissionPerShirt,
      quota,
      totalCommission,
      totalIncome,
    };
    setPlayers(prev => [...prev, newPlayer]);
  }, [players]);

  const updateSales = useCallback((id, newSales, newName) => {
    setPlayers(prev =>
      prev.map(player => {
        if (player.id === id) {
          const { level, salary, commissionPerShirt, quota } = calculateCommissionAndSalary(newSales);
          const totalCommission = newSales >= quota ? newSales * commissionPerShirt : 0;
          const totalIncome = salary + totalCommission;
          return {
            ...player,
            sales: newSales,
            level,
            salary,
            commissionPerShirt,
            quota,
            totalCommission,
            totalIncome,
            ...(newName !== undefined && { name: newName }),
          };
        }
        return player;
      })
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
        totalCommission: 0,
        totalIncome: player.salary,
      }))
    );
  }, []);

  const sortPlayers = (criteria) => {
    setPlayers(prev =>
      [...prev].sort((a, b) => {
        if (criteria === 'sales') return b.sales - a.sales;
        if (criteria === 'name') return a.name.localeCompare(b.name);
        return 0;
      })
    );
  };

  const togglePayout = () => {
    setShowPayout(prev => !prev);
  };

  return (
    <div className="app">
      <h1 
        className={`collapsible-header ${isCollapsed ? 'collapsed' : ''}`} 
        onClick={() => setIsCollapsed(prev => !prev)}
      >
        UA TIKTOK LEADERBOARD
      </h1>
      <div className={`controls-container ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="controls">
          <div className="top-buttons">
            <AddPlayerForm addPlayer={addPlayer} currentPlayers={players} />
          </div>
          <div className="buttons-container">
            <button className="action-button" onClick={resetPlayers}>
              Reset
            </button>
            <button className="action-button" onClick={deleteAllPlayers}>
              Clear
            </button>
          </div>
          <div className="sort-buttons">
            <button className="sort-button" onClick={() => sortPlayers('sales')}>
              Sort by Sales
            </button>
            <button className="sort-button" onClick={() => sortPlayers('name')}>
              Sort by Name
            </button>
            <button className="sort-button" onClick={togglePayout}>
              {showPayout ? 'Hide Payout' : 'Show Payout'}
            </button>
          </div>
        </div>
      </div>
      <Leaderboard 
        players={players} 
        updateSales={updateSales} 
        deletePlayer={deletePlayer}
        showPayout={showPayout} // Pass showPayout state
        isCollapsed={isCollapsed} // Pass collapse state to Leaderboard
      />
    </div>
  );
};

export default App;
