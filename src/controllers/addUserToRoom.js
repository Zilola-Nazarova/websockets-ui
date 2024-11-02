import gameData from '../database/gameData.js';

const addUserToRoom = (msgJSON) => {
  console.log('Adding User To Room');
  console.log(gameData);
  return {
    type: msgJSON.type,
    data: gameData.addUserToRoom(msgJSON.data),
    id: msgJSON.id
  }
}

export default addUserToRoom;
