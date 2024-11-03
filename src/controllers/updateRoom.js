import gameData from '../database/gameData.js';

const updateRoom = (id) => {
  console.log('Updating the Room');
  const data = gameData.updateRoom();
  return {
    type: "update_room",
    data: JSON.stringify(data),
    id
  };
}

export default updateRoom;
