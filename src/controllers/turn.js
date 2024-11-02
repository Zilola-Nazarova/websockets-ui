import gameData from '../database/gameData.js';

const turn = (req, res) => {
  console.log('Changing the turn');
  console.log(gameData);
}

export default turn;
