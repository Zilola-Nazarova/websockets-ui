import gameData from '../database/gameData.js';

const createRoom = () => {
  console.log('Creating the Room');
  return gameData.createRoom();
}

export default createRoom;
