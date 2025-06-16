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

        // Ensure sales is a number
        const salesNum = parseInt(sales, 10);
        if (isNaN(salesNum)) {
            alert('Sales must be a number.');
            return;
        }

        // Check if the player limit is reached
        if (currentPlayers.length >= 20) {
            alert('You can only add up to 20 players.');
            return;
        }

        // Check for duplicate names (case-insensitive)
        if (currentPlayers.some(player => player.name.toLowerCase() === name.toLowerCase())) {
            alert('Player with this name already exists.');
            return;
        }

        // Add the player
        addPlayer(name, salesNum);
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
                placeholder="Sales (will be added to pre-sales if any)"
                value={sales}
                onChange={(e) => setSales(e.target.value)}
                required
            />
            <button type="submit">Add Tiktok Anchor</button>
            <div style={{ fontSize: '0.9em', color: '#aaa', marginTop: 4 }}>
                For ANTON, IVY, JUDY, LEAH, SYRUS, CRYSTAL, WINRAD: pre-sales will be auto-added.
            </div>
        </form>
    );
};

export default AddPlayerForm;
