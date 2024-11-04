import gameData from '../database/gameData.js';

const turn = (msgJSON) => {
  console.log('Changing the turn');
  console.log(gameData);
  return {
    type: msgJSON.type,
    data: gameData.turn(msgJSON.data),
    id: msgJSON.id
  }
}

export default turn;
