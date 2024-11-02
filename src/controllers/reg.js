import gameData from '../database/gameData.js';

const reg = (type, dataJSON, id) => {
  console.log('Registering');
  const data = gameData.reg(dataJSON.name, dataJSON.password);
  return {
    type: type,
    data: JSON.stringify(data),
    id: id
  }
}

export default reg;
