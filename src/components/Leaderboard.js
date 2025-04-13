import React, { useState, useEffect } from 'react';
import RewardModal from './RewardModal';
import LeaderboardEntry from './LeaderboardEntry';
import '../styles/global.css';
import '../styles/layout.css';
import '../styles/typography.css';
import '../styles/form.css';
import '../styles/leaderboard.css';
import '../styles/animations.css';
import '../styles/buttons.css';
import '../styles/modals.css';
import '../styles/responsive.css';

const getBadge = (sales) => {
  if (sales >= 1000) {
    return { badge: 'Platinum', reward: 'Brand New iPhone 15' };
  } else if (sales >= 700) {
    return { badge: 'Gold', reward: null };
  } else if (sales >= 500) {
    return { badge: 'Silver', reward: null };
  } else if (sales >= 400) {
    return { badge: 'Bronze', reward: null };
  }
  return { badge: null, reward: null };
};

const Leaderboard = ({ players, updateSales, deletePlayer }) => {
  const [sortedPlayers, setSortedPlayers] = useState(players);
  const [showCommission, setShowCommission] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Sync sortedPlayers with parent players when they change.
  useEffect(() => {
    setSortedPlayers(players);
  }, [players]);

  // Sort players based on the selected criteria.
  const sortPlayers = (criteria) => {
    const sorted = [...sortedPlayers].sort((a, b) => {
      if (criteria === 'sales') {
        return b.sales - a.sales;
      } else if (criteria === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
    setSortedPlayers(sorted);
  };

  const toggleCommission = () => {
    setShowCommission(prev => !prev);
  };

  const handleShowReward = (player) => {
    if (player.sales >= 1000) {
      const { reward } = getBadge(player.sales);
      setModalMessage(`Congratulations ${player.name}! You reached 1000 sales and you won a ${reward}.`);
      setModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Compute rankings: players with equal sales share the same rank.
  const rankedPlayers = sortedPlayers
    .slice() // create a shallow copy
    .sort((a, b) => b.sales - a.sales)
    .reduce((acc, player, index) => {
      if (index === 0) {
        acc.push({ ...player, rank: 1 });
      } else {
        const lastPlayer = acc[acc.length - 1];
        if (player.sales === lastPlayer.sales) {
          acc.push({ ...player, rank: lastPlayer.rank });
        } else {
          acc.push({ ...player, rank: index + 1 });
        }
      }
      return acc;
    }, []);

  const topPlayer = rankedPlayers[0];
  const otherPlayers = rankedPlayers.slice(1);

  return (
    <div>
      {/* Sort and Commission Toggle Buttons */}
      <div>
        <button className="sort-button" onClick={() => sortPlayers('sales')}>
          Sort by Sales
        </button>
        <button className="sort-button" onClick={() => sortPlayers('name')}>
          Sort by Name
        </button>
        <button className="sort-button" onClick={toggleCommission}>
          {showCommission ? 'Hide Commission' : 'Show Commission'}
        </button>
      </div>
      
      {/* Top Player */}
      <div className="top-player">
        {topPlayer && (
          <>
            <LeaderboardEntry 
              player={topPlayer} 
              index={0} 
              updateSales={updateSales} 
              deletePlayer={deletePlayer} 
              showCommission={showCommission}
            />
            {topPlayer.sales >= 1000 && (
              <button 
                className="claim-reward-button"
                onClick={() => handleShowReward(topPlayer)}
              >
                Claim Reward
              </button>
            )}
          </>
        )}
      </div>
      
      {/* Other Players (One Column Layout) */}
      <div className="player-table">
        {otherPlayers.map((player, index) => (
          <div key={player.id}>
            <LeaderboardEntry 
              player={player} 
              index={index + 1} 
              updateSales={updateSales} 
              deletePlayer={deletePlayer} 
              showCommission={showCommission}
            />
            {player.sales >= 1000 && (
              <button 
                className="claim-reward-button"
                onClick={() => handleShowReward(player)}
              >
                Claim Reward
              </button>
            )}
          </div>
        ))}
      </div>
      
      <RewardModal 
        visible={modalVisible} 
        message={modalMessage} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default Leaderboard;
