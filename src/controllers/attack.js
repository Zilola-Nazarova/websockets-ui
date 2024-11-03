import gameData from '../database/gameData.js';

const attack = ({ gameId, x, y, indexPlayer }) => {
  const data = gameData.attack(gameId, x, y, indexPlayer);
  const players = gameData.getPlayers(gameId);
  
  return {
    feedback: { position: data.position, status: data.status },
    players,
    win: data.win
  };
}

export default attack;
