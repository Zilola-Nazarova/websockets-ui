import gameData from '../database/gameData.js';

const startGame = (msgJSON) => {
  console.log('Starting the game');
  console.log(gameData);
  return {
    type: msgJSON.type,
    data: gameData.startGame(msgJSON.data),
    id: msgJSON.id
  }
}

export default startGame;
