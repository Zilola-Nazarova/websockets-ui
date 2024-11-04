import gameData from '../database/gameData.js';

const createGame = (id, indexRoom) => {
  console.log('Creating the Game');
  const gameId = gameData.createGame(indexRoom);
  return gameId;
}

export default createGame;
