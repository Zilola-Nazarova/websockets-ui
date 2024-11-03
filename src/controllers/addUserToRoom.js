import gameData from '../database/gameData.js';

const addUserToRoom = (indexRoom, userId) => {
  console.log('Adding User To Room');
  return gameData.addUserToRoom(indexRoom, userId);
}

export default addUserToRoom;
