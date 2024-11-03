import getShipPositions from "./getShipPositions.js";

const getSurroundingCells = (position, gridSize) => {
  const { x, y } = position;
  return [
      { x: x - 1, y: y - 1 }, { x: x, y: y - 1 }, { x: x + 1, y: y - 1 },
      { x: x - 1, y: y },                     { x: x + 1, y: y },
      { x: x - 1, y: y + 1 }, { x: x, y: y + 1 }, { x: x + 1, y: y + 1 }
  ].filter(pos => pos.x >= 0 && pos.x < gridSize && pos.y >= 0 && pos.y < gridSize);
};

const getBlockedPositions = (enemyShips, gridSize) => {
  const blockedPositions = new Set();
  for (const ship of enemyShips) {
    if (ship.hits && ship.hits.length === ship.length) { // Ship is "killed"
      const shipPositions = getShipPositions(ship);
      shipPositions.forEach(pos => {
        blockedPositions.add(`${pos.x},${pos.y}`);
        const surroundingCells = getSurroundingCells(pos, gridSize);
        surroundingCells.forEach(cell => blockedPositions.add(`${cell.x},${cell.y}`));
      });
    }
  }

  return blockedPositions;
};

export default getBlockedPositions;
