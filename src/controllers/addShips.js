import gameData from '../database/gameData.js';

const addShips = ({ gameId, ships, indexPlayer }) => {
  console.log('Adding Ships');
  const readyState = gameData.addShips(gameId, ships, indexPlayer);
  return readyState;
}

export default addShips;
