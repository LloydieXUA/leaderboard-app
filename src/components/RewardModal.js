import React from 'react';
import './RewardModal.css';

const RewardModal = ({ visible, message, onClose }) => {
  if (!visible) return null;
  return (
    <div className="reward-modal-overlay">
      <div className="reward-modal">
        <h2>Congratulations!</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RewardModal;
