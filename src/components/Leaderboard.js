import React, { useState} from 'react';
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

const Leaderboard = ({ players, updateSales, deletePlayer, showPayout }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleShowReward = (player) => {
    if (player.sales >= 550) {
      setModalMessage(`Congratulations ${player.name}! You won a Iphone 15 Pro Max.`);
      setModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const rankedPlayers = players
    .slice()
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
      {/* Top Player */}
      <div className="top-player">
        {topPlayer && (
          <>
            <LeaderboardEntry 
              player={topPlayer} 
              index={0} 
              updateSales={updateSales} 
              deletePlayer={deletePlayer} 
              showPayout={showPayout}
            />
            {topPlayer.sales >= 550 && (
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
      
      {/* Other Players */}
      <div className="player-table">
        {otherPlayers.map((player, index) => (
          <div key={player.id}>
            <LeaderboardEntry 
              player={player} 
              index={index + 1} 
              updateSales={updateSales} 
              deletePlayer={deletePlayer} 
              showPayout={showPayout}
            />
            {player.sales >= 550 && (
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
