import gameData from '../database/gameData.js';

const finish = (req, res) => {
  console.log('Finish the game');
  console.log(gameData);
}

export default finish;
