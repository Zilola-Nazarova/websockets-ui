import gameData from '../database/gameData.js';

const randomAttack = (msgJSON) => {
  console.log('Random Attack');
  console.log(gameData);
  return {
    type: msgJSON.type,
    data: gameData.randomAttack(msgJSON.data),
    id: msgJSON.id
  }
}

export default randomAttack;
