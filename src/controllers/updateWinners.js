import gameData from '../database/gameData.js';

const updateWinners = (id) => {
  console.log('Updating Winners');
  const data = gameData.updateWinners();
  return {
    type: "update_winners",
    data: JSON.stringify(data),
    id
  };
}

export default updateWinners;
