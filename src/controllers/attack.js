import gameData from '../database/gameData.js';

const attack = (msgJSON) => {
  console.log('Attacking');
  console.log(gameData);
  return {
    type: msgJSON.type,
    data: gameData.attack(msgJSON.data),
    id: msgJSON.id
  }
}

export default attack;
