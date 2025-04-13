import React, { useState } from 'react';

const AddPlayerForm = ({ addPlayer, currentPlayers }) => {
    const [name, setName] = useState('');
    const [sales, setSales] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate input
        if (!name || !sales) {
            alert('Please enter both name and sales.');
            return;
        }

        // Check if the player limit is reached
        if (currentPlayers.length >= 20) {
            alert('You can only add up to 20 players.');
            return;
        }

        // Add the player
        addPlayer(name, sales);
        setName('');
        setSales('');
    };

    return (
        <form onSubmit={handleSubmit} className="add-player-form">
            <input
                type="text"
                placeholder="Player Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Sales"
                value={sales}
                onChange={(e) => setSales(e.target.value)}
                required
            />
            <button type="submit">Add Tiktok Anchor</button>
        </form>
    );
};

export default AddPlayerForm;