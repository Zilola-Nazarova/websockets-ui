import gameData from '../database/gameData.js';

const updateWinners = (msgJSON) => {
  console.log('Updating Winners');
  console.log(gameData);
  return {
    type: msgJSON.type,
    data: gameData.updateWinners(msgJSON.data),
    id: msgJSON.id
  }
}

export default updateWinners;
