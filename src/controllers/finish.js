import gameData from '../database/gameData.js';

const finish = (winnerId) => {
  return gameData.finish(winnerId);
}

export default finish;
