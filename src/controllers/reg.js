import gameData from '../database/gameData.js';

const reg = (id, { name, password }, userId) => {
  console.log('Registering');
  const data = gameData.reg(name, password, userId);
  return {
    type: 'reg',
    data: JSON.stringify(data),
    id
  };
}

export default reg;
