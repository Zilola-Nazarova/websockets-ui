import gameData from '../database/gameData.js';

const reg = (msgJSON) => {
  console.log('Registering');
  console.log(gameData);
  return {
    type: msgJSON.type,
    data: gameData.reg(msgJSON.data),
    id: msgJSON.id
  }
}

export default reg;
