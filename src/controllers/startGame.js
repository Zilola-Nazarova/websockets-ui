import gameData from '../database/gameData.js';

const startGame = (req, res) => {
  console.log('Starting the game');
  console.log(gameData);
}

export default startGame;
