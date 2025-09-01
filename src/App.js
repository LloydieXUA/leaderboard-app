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

const metrics = [
  { level: 'Alpha',      salary: 24000, commissionPerShirt: 42, quota: 1225 },
  { level: 'Elite',      salary: 22000, commissionPerShirt: 40, quota: 1025 },
  { level: 'Closer',     salary: 21000, commissionPerShirt: 40, quota:  925 },
  { level: 'Pro',        salary: 19000, commissionPerShirt: 40, quota:  825 },
  { level: 'Semi-Pro',   salary: 17000, commissionPerShirt: 40, quota:  725 },
  { level: 'Star',       salary: 15000, commissionPerShirt: 40, quota:  625 },
  { level: 'Rising Star',salary: 13000, commissionPerShirt: 35, quota:  475 },
  { level: 'Rookie',     salary:  5000, commissionPerShirt:  0, quota:  250 }
];

// Always show the real level based on exact sales
const calculateCommissionAndSalary = (totalSales) => {
  for (let i = 0; i < metrics.length; i++) {
    const { quota } = metrics[i];
    if (totalSales >= quota) {
      return metrics[i];
    }
  }
  // If no quota reached, return the lowest level
  return metrics[metrics.length - 1];
};

// Helper: computes commission with a 25-shirt deduction once quota is met
// Commission = max(min(totalSales, quota) - 25, 0) * commissionPerShirt
const computePayout = (totalSales, quota, commissionPerShirt, salary) => {
  if (totalSales < quota) {
    return { totalCommission: 0, totalIncome: salary };
  }
  const commissionableAfterDeduction = Math.max(Math.min(totalSales, quota) - 25, 0);
  const totalCommission = commissionableAfterDeduction * commissionPerShirt;
  const totalIncome = salary + totalCommission;
  return { totalCommission, totalIncome };
};

const preSalesMap = {
  'FLOR': 172,
  'JUDY':  40
};

const App = () => {
  const [players, setPlayers] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showPayout, setShowPayout] = useState(false);

  const addPlayer = useCallback((name, sales) => {
    if (players.find(player => player.name.toLowerCase() === name.toLowerCase())) {
      alert("Duplicate names are not allowed.");
      return;
    }
    const newSales = parseInt(sales, 10);
    if (isNaN(newSales)) {
      alert("Sales must be a number.");
      return;
    }
    const upperName = name.trim().toUpperCase();
    const preSales = preSalesMap[upperName] || 0;
    const totalSales = newSales + preSales;

    const { level, salary, commissionPerShirt, quota } = calculateCommissionAndSalary(totalSales);
    const { totalCommission, totalIncome } = computePayout(totalSales, quota, commissionPerShirt, salary);

    const newPlayer = {
      id: Date.now() + Math.random(),
      name: upperName,
      preSales,
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
          const nameToUse = newName !== undefined ? newName.trim().toUpperCase() : player.name;
          const preSales = preSalesMap[nameToUse] || 0;
          const totalSales = newSales + preSales;

          const { level, salary, commissionPerShirt, quota } = calculateCommissionAndSalary(totalSales);
          const { totalCommission, totalIncome } = computePayout(totalSales, quota, commissionPerShirt, salary);

          return {
            ...player,
            name: nameToUse,
            preSales,
            sales: newSales,
            level,
            salary,
            commissionPerShirt,
            quota,
            totalCommission,
            totalIncome,
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

  const togglePayout = () => setShowPayout(prev => !prev);

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
            <button className="action-button" onClick={resetPlayers}>Reset</button>
            <button className="action-button" onClick={deleteAllPlayers}>Clear</button>
          </div>
          <div className="sort-buttons">
            <button className="sort-button" onClick={() => sortPlayers('sales')}>Sort by Sales</button>
            <button className="sort-button" onClick={() => sortPlayers('name')}>Sort by Name</button>
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
        showPayout={showPayout}
        isCollapsed={isCollapsed}
      />
    </div>
  );
};

export default App;
