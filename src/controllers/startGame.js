import gameData from '../database/gameData.js';

const startGame = ({ gameId, indexPlayer }) => {
  console.log('Starting the game');
  const data = gameData.startGame(gameId, indexPlayer);
  const players = gameData.getPlayers(gameId);

  return {
    feedback: data,
    players
  };
}

export default startGame;
