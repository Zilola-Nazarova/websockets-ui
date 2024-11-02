import gameData from '../database/gameData.js';

const updateRoom = (msgJSON) => {
  console.log('Updating the Room');
  console.log(gameData);
  return {
    type: msgJSON.type,
    data: gameData.updateRoom(msgJSON.data),
    id: msgJSON.id
  }
}

export default updateRoom;
