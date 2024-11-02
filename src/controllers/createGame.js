import gameData from '../database/gameData.js';

const createGame = (msgJSON) => {
  console.log('Creating the Game');
  console.log(gameData);
  return {
    type: msgJSON.type,
    data: gameData.createGame(msgJSON.data),
    id: msgJSON.id
  }
}

export default createGame;
