import gameData from '../database/gameData.js';

const randomAttack = ({ gameId, indexPlayer }, id) => {
  const data = gameData.randomAttack(gameId, indexPlayer);
  const players = gameData.getPlayers(gameId);
  
  return {
    feedback: { data: data.position, status: data.status },
    players,
    win: data.win
  };
}

export default randomAttack;
