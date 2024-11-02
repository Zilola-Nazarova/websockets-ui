import gameData from '../database/gameData.js';

const createRoom = (msgJSON) => {
  console.log('Creating the Room');
  console.log(gameData);
  return {
    type: msgJSON.type,
    data: gameData.createRoom(msgJSON.data),
    id: msgJSON.id
  }
}

export default createRoom;
