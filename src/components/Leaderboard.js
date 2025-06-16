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

  // Only top player with 930+ sales can claim reward
  const handleShowReward = (player) => {
    setModalMessage(`Congratulations ${player.name}! You won the Honda Click 125cc Fi.`);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const rankedPlayers = players
    .slice()
    .sort((a, b) => {
      // Sort by total sales (preSales + sales)
      const totalA = (a.preSales || 0) + (a.sales || 0);
      const totalB = (b.preSales || 0) + (b.sales || 0);
      return totalB - totalA;
    })
    .reduce((acc, player, index) => {
      const totalSales = (player.preSales || 0) + (player.sales || 0);
      if (index === 0) {
        acc.push({ ...player, rank: 1, totalSales });
      } else {
        const lastPlayer = acc[acc.length - 1];
        if (totalSales === lastPlayer.totalSales) {
          acc.push({ ...player, rank: lastPlayer.rank, totalSales });
        } else {
          acc.push({ ...player, rank: index + 1, totalSales });
        }
      }
      return acc;
    }, []);

  const topPlayer = rankedPlayers[0];
  const otherPlayers = rankedPlayers.slice(1);

  // Show Honda Click if total sales (preSales + sales) >= 930
  const canClaimHonda = topPlayer && topPlayer.totalSales >= 930;

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
            {canClaimHonda && (
              <button 
                className="claim-reward-button"
                onClick={() => handleShowReward(topPlayer)}
              >
                Claim Honda Click 125cc Fi
              </button>
            )}
          </>
        )}
      </div>
      
      {/* Other Players */}
      <div
        className="player-table"
        style={{
          maxHeight: '60vh',
          overflowY: 'auto',
          paddingRight: 8
        }}
      >
        {otherPlayers.map((player, index) => (
          <LeaderboardEntry
            key={player.id}
            player={player}
            index={index + 1}
            updateSales={updateSales}
            deletePlayer={deletePlayer}
            showPayout={showPayout}
          />
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
