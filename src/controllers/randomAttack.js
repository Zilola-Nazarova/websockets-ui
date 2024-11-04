import gameData from '../database/gameData.js';

const randomAttack = ({ gameId, indexPlayer }) => {
  const data = gameData.randomAttack(gameId, indexPlayer);
  const players = gameData.getPlayers(gameId);
  
  return {
    feedback: { position: data.position, status: data.status },
    players,
    win: data.win
  };
}

export default randomAttack;
