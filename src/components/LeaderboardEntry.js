import React, { useState } from 'react';
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
import ANTON from '../images/ANTON.jpg';
import SYRUS from '../images/SYRUS.jpg';
import IVY from '../images/IVY.jpg';
import WINRAD from '../images/WINRAD.jpg';
import JUDY from '../images/JUDY.jpg';
import CRYSTAL from '../images/CRYSTAL.jpg';
import LEAH from '../images/LEAH.jpg';
import FLOR from '../images/FLOR.jpg';


const images = {
  'ANTON': ANTON,
  'SYRUS': SYRUS,
  'IVY': IVY,
  'WINRAD': WINRAD,
  'JUDY': JUDY,
  'CRYSTAL': CRYSTAL,
  'LEAH': LEAH,
  'FLOR': FLOR
  
};

const LeaderboardEntry = ({ player, index, updateSales, deletePlayer, showPayout }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(player.name);
  const [editedSales, setEditedSales] = useState(player.sales);

  const getBackgroundColor = () => {
    if (player.sales >= 1225) return 'gold';
    if (player.sales >= 1025) return 'silver';
    if (player.sales >= 925) return '#cd7f32';
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

  const totalSales = (player.preSales || 0) + (player.sales || 0);

  return (
    <motion.div
      className={`entry${index === 0 ? ' top-player' : ''}`}
      style={{ 
        backgroundColor: getBackgroundColor(),
        color: textColor,
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
      <div className="image-container">
        <img 
          src={images[player.name] || 'https://via.placeholder.com/100'} 
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
          Pre-Sales: {player.preSales || 0}
        </p>
        <p style={{ color: textColor, margin: '5px 0' }}>
          Sales: {totalSales}
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
