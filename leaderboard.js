// 1. Hardcoded pre-sales values
const preSales = {
  ANTON: 0,
  IVY: 22,
  JUDY: 71,
  LEAH: 72,
  SYRUS: 0,
  CRYSTAL: 0,
  WINRAD: 0
};

const leaderboard = {}; // Add this line if not present

// 2. Updated metrics
const metrics = [
  { level: "Alpha", salary: 24000, commission: 40, sales: 930 },
  { level: "Elite", salary: 22000, commission: 40, sales: 850 },
  { level: "Closer", salary: 21000, commission: 40, sales: 800 },
  { level: "Pro", salary: 19000, commission: 40, sales: 700 },
  { level: "Semi-Pro", salary: 17000, commission: 40, sales: 600 },
  { level: "Star", salary: 15000, commission: 40, sales: 500 },
  { level: "Rising Star", salary: 13000, commission: 35, sales: 400 },
  { level: "Rookie", salary: 5000, commission: 0, sales: 250 }
];

// 3. Register user with pre-sales
function registerUser(name) {
  const upperName = name.toUpperCase();
  const startingSales = preSales[upperName] || 0;
  leaderboard[upperName] = {
    name: upperName,
    sales: startingSales,
    // ...other properties...
  };
}

// 4. Add sales (sum with pre-sales)
function addSales(name, salesAmount) {
  const upperName = name.toUpperCase();
  if (!leaderboard[upperName]) registerUser(upperName);
  leaderboard[upperName].sales += salesAmount;
}

// 5. Determine reward winner
function getRewardWinner() {
  let winner = null;
  let maxSales = 930;
  for (const user of Object.values(leaderboard)) {
    if (user.sales >= 930 && (!winner || user.sales > winner.sales)) {
      winner = user;
    }
  }
  return winner;
}
