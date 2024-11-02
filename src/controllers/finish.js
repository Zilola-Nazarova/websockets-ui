import gameData from '../database/gameData.js';

const finish = (msgJSON) => {
  console.log('Finish the game');
  console.log(gameData);
  return {
    type: msgJSON.type,
    data: gameData.finish(msgJSON.data),
    id: msgJSON.id
  }
}

export default finish;
