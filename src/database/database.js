import { v4 as uuidv4 } from 'uuid';
import getBlockedPositions from './blockedPositions.js';
import getShipPositions from './getShipPositions.js';

class User {
  constructor (id, name, password) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.wins = 0;
  }
}

class Game {
  constructor (id) {
    this.id = id;
    this.players = [];
  }
}

class Player {
  constructor (id) {
    this.id = id;
    this.ships = [];
    this.attacks = [];
  }
}

class Room {
  constructor (id, availability) {
    this.id = id;
    this.available = availability;
    this.users = [];
  }

  reserve () {
    if (!this.available) {
      this.available = false;
      return true;
    } else {
      return false;
    }
  }
}

class Database {
  #users;
  #games;
  #rooms;
  #currentUser;

  constructor () {
    this.#users = [];
    this.#games = [];
    this.#rooms = [];
    this.#currentUser = {};
  }

  reg (name, password, userId) {
    const currentUser = this.#users.find((user) => user.name === name);
    if (currentUser) {
      this.#currentUser = currentUser;
      return { name: currentUser.name, index: currentUser.id, error: false, errorText: "" };
    } else {
      const newUser = new User(userId, name, password);
      this.#users.push(newUser);
      return;
    }
  }

  updateWinners () {
    return this.#users.map((user) => {
      return { name: user.name, wins: user.wins }
    });
  }

  updateRoom () {
    return this.#rooms.map((room) => {
      if (room.users.length < 2) {
        return {
          roomId: room.id,
          roomUsers: room.users.map((user) => {
            return {
              name: user.name,
              index: user.id
            }
          }) || []
        };
      }
    });
  }

  createRoom () {
    const room = new Room(uuidv4(), true);
    this.#rooms.push(room);
    return room.id;
  }

  addUserToRoom (indexRoom, userId) {
    const room = this.#rooms.find((room) => room.id === indexRoom);
    const user = this.#users.find((user) => user.id === userId);
    room.users.push(user);
    return room.users;
  }

  createGame (indexRoom) {
    const game = new Game(uuidv4());
    const users = this.#rooms.find((room) => room.id === indexRoom).users
    users.forEach((user) => {
      const player = new Player(user.id);
      game.players.push(player);
    });
    this.#games.push(game);
    return game.id;
  }

  addShips (gameId, ships, indexPlayer) {
    const currentGame = this.#games.find((game) => game.id === gameId);
    const players = currentGame.players;
    const currentPlayer = players.find((player) => player.id === indexPlayer);
    currentPlayer.ships = ships;
    const readyPlayers = players.filter((player) => {
      return player.ships.length > 0;
    });

    if (readyPlayers.length === 2) {
      return true;
    } else {
      return false;
    }
  }

  startGame (gameId, indexPlayer) {
    const ships = this.#games
                    .find((game) => game.id === gameId).players
                    .find((player) => player.id === indexPlayer).ships
    return {
      ships,
      currentPlayerIndex: indexPlayer
    }
  }

  attack (gameId, x, y, indexPlayer) {
    let hitShip = null;
    let hitPosition = null;
    const currentGame = this.#games.find((game) => game.id === gameId)
    const enemy = currentGame.players.find((player) => player.id !== indexPlayer);
    const attacker = currentGame.players.find((player) => player.id === indexPlayer);
    attacker.attacks.push({ x, y });
    const enemyShips = enemy.ships;

    for (const ship of enemyShips) {
      const shipPositions = getShipPositions(ship);
      for (const pos of shipPositions) {
        if (pos.x === x && pos.y === y) {
          hitShip = ship;
          hitPosition = pos;
          break;
        }
      }

      if (hitShip) break;
    }

    if (hitShip) {
      if (!hitShip.hits) {
        hitShip.hits = []
      };
      hitShip.hits.push(hitPosition);
      const isKilled = hitShip.hits.length === hitShip.length;
      const win = enemyShips.every((ship) => ship.hits && ship.hits.length === ship.length);
      return {
        position: { x, y },
        status: isKilled ? "killed" : "shot",
        win
      };
    }

    return {
      position: { x, y },
      status: "miss",
      win: false
    }
  }

  randomAttack (gameId, indexPlayer) {
    const gridSize = 10;
    const validPositions = [];
    const currentGame = this.#games.find((game) => game.id === gameId)
    const enemy = currentGame.players.find((player) => player.id !== indexPlayer);
    const attacker = currentGame.players.find((player) => player.id === indexPlayer);
    const attackedPositions = new Set(attacker.attacks.map(({ x, y }) => `${x},${y}`));
    const blockedPositions = getBlockedPositions(enemy.ships, gridSize);

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const key = `${x},${y}`;
        if (!attackedPositions.has(key) && !blockedPositions.has(key)) {
          validPositions.push({ x, y });
        }
      }
    }
    const randomIndex = Math.floor(Math.random() * validPositions.length);
    const { x, y } = validPositions[randomIndex];
    return this.attack(gameId, x, y, indexPlayer);
  }

  getPlayers (gameId) {
    return this.#games
      .find((game) => game.id === gameId).players
  }

  finish (winnerId) {
    return { winPlayer: winnerId };
  }
}

export default Database;
