const getShipPositions = (ship) => {
  const positions = [];
  for (let i = 0; i < ship.length; i++) {
      const pos = {
          x: ship.position.x + (ship.direction ? 0 : i),
          y: ship.position.y + (ship.direction ? i : 0),
      };
      positions.push(pos);
  }
  return positions;
};

export default getShipPositions;
