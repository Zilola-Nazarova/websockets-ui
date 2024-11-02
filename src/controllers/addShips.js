import gameData from '../database/gameData.js';

const addShips = (msgJSON) => {
  console.log('Adding Ships');
  console.log(gameData);
  return {
    type: msgJSON.type,
    data: gameData.addShips(msgJSON.data),
    id: msgJSON.id
  }
}

export default addShips;
