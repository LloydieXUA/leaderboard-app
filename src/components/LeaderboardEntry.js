import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/global.css';
import '../styles/layout.css';
import '../styles/typography.css';
import '../styles/form.css';
import '../styles/leaderboard.css';
import '../styles/animations.css';
import '../styles/buttons.css';
import '../styles/modals.css';
import '../styles/responsive.css';
import RHYJY from '../images/RHYJY.jpg';
import ANTON from '../images/ANTON.jpg';
import SYRUS from '../images/SYRUS.jpg';
import IVY from '../images/IVY.jpg';
import WINRAD from '../images/WINRAD.jpg';
import JUDY from '../images/JUDY.jpg';
import CRYSTAL from '../images/CRYSTAL.jpg';
import LEAH from '../images/LEAH.jpg';
import QUEEN from '../images/QUEEN.jpg';
import SAMMY from '../images/SAMMY.jpg';
import test10 from '../images/test10.jpg';
import test11 from '../images/test11.jpg';
import test12 from '../images/test12.jpg';
import test13 from '../images/test13.jpg';
import test14 from '../images/test14.jpg';
import test15 from '../images/test15.jpg';
import jackpotSound from '../sounds/jackpot.mp3';

const images = {
  'RHYJY': RHYJY,
  'ANTON': ANTON,
  'SYRUS': SYRUS,
  'IVY': IVY,
  'WINRAD': WINRAD,
  'JUDY': JUDY,
  'CRYSTAL': CRYSTAL,
  'LEAH': LEAH,
  'QUEEN': QUEEN,
  'SAMMY ': SAMMY,
  'Test 10': test10,
  'Test 11': test11,
  'Test 12': test12,
  'Test 13': test13,
  'Test 14': test14,
  'Test 15': test15,
};

const LeaderboardEntry = ({ player, index, updateSales, deletePlayer, showPayout }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(player.name);
  const [editedSales, setEditedSales] = useState(player.sales);
  const soundRef = useRef(null);

  const getBackgroundColor = () => {
    if (player.sales >= 550) return 'gold';
    if (player.sales >= 530) return 'silver';
    if (player.sales >= 500) return '#cd7f32';
    if (index >= 9 && index <= 14) return 'rgba(255, 0, 0, 0.2)';
    return 'transparent';
  };

  const textColor = getBackgroundColor() === 'transparent' ? 'white' : 'black';

  const handleEdit = () => {
    setEditMode(true);
    setShowPopup(false);
  };

  const handleDelete = () => {
    setShowConfirm(true);
    setShowPopup(false);
  };

  const confirmDelete = () => {
    deletePlayer(player.id);
    setShowConfirm(false);
  };

  const saveEdit = () => {
    updateSales(player.id, editedSales, editedName);
    setEditMode(false);
  };

  useEffect(() => {
    if (index === 0 && player.sales > 1000) {
      let playCount = 0;
      const playSound = () => {
        if (playCount < 5) {
          soundRef.current.play();
          playCount++;
          soundRef.current.addEventListener('loadedmetadata', () => {
            setTimeout(playSound, soundRef.current.duration * 1000);
          });
        }
      };
      soundRef.current.addEventListener('loadedmetadata', () => {
        playSound();
      });
    }
  }, [index, player.sales]);

  return (
    <motion.div
      className={`entry ${index === 0 ? 'top-player' : ''}`}
      style={{ 
        backgroundColor: getBackgroundColor(),
        position: 'relative', 
        padding: '25px', 
        margin: '15px', 
        borderRadius: '30px', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center'
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <audio ref={soundRef} src={jackpotSound} />
      <div className="image-container">
        <img 
          src={images[player.name] || 'https://via.placeholder.com/150'} 
          alt={player.name} 
          className="player-image"
          onClick={() => setShowPopup(true)}
        />
      </div>

      <div className="player-info" style={{ flex: 1 }}>
        {player.rank && (
          <p className="player-rank" style={{ margin: '5px 0', fontWeight: 'bold', color: textColor }}>
            Rank: {player.rank}
          </p>
        )}
        <h2 style={{ color: textColor, fontSize: '1.5em', margin: '0 0 10px 0' }}>
          {player.name}
        </h2>
        <p style={{ color: textColor, margin: '5px 0' }}>
          Level: {player.level}
        </p>
        <p style={{ color: textColor, margin: '5px 0' }}>
          Sales: {player.sales}
        </p>
        {showPayout && (
          <>
            <p style={{ color: textColor, margin: '5px 0' }}>
              Salary: {player.salary.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })}
            </p>
            <p style={{ color: textColor, margin: '5px 0' }}>
              Commission per Shirt: {player.commissionPerShirt.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })}
            </p>
            <p style={{ color: textColor, margin: '5px 0' }}>
              Total Commission: {player.totalCommission.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })}
            </p>
            <p style={{ color: textColor, margin: '5px 0' }}>
              Total Income: {player.totalIncome.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' })}
            </p>
          </>
        )}
        {player.sales >= 550 && (
          <p style={{ color: 'gold', fontWeight: 'bold', margin: '5px 0' }}>
            Reward: iPhone 15 Pro Max
          </p>
        )}
      </div>

      {showPopup && (
        <div className="popup">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}

      {editMode && (
        <div className="edit-modal">
          <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
          <input type="number" value={editedSales} onChange={(e) => setEditedSales(Number(e.target.value))} />
          <button onClick={saveEdit}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      )}

      {showConfirm && (
        <div className="confirm-modal">
          <p>Are you sure you want to delete?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={() => setShowConfirm(false)}>No</button>
        </div>
      )}
    </motion.div>
  );
};

export default LeaderboardEntry;
