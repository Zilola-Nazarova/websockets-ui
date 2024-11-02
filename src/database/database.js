import { v4 as uuidv4 } from 'uuid';
 
class User {
  constructor (id, name, password) {
    this.id = id;
    this.name = name;
    this.password = password;
  }
}

class Game {
  constructor (id, userId) {
    this.id = id;
    this.players = [];
    // this.ships
  }
}

class Room {
  constructor (id, availability) {
    this.id = id;
    this.available = availability;
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

  reg (name, password) {
    const user = new User(uuidv4(), name, password);
    this.#users.push(user);
    this.#currentUser = user;
    return { name: user.name, index: user.id, error: false, errorText: ''};
  }

  updateWinners () {
    return this.#users.sort().map((user) => {
      return { name: user.name, wins: 0 };
    })
  }

  createRoom () {
    const room = new Room(uuidv4(), true);
    this.#rooms.push(room);
    return "";
  }

  addUserToRoom (index) {
    const result = this.#rooms.find((room) => room.id === index).reserve();
    if (result) {
      return { indexRoom: index };
    } else {
      return { error: 'The room is unavailable' };
    }
  }

  createGame (userId) {
    const game = new Game(uuidv4(), this.#currentUser.id);
    this.#games.push(game);
    return game;
  }

  updateRoom () {

  }

  addShips (gameId, ships, indexPlayer) {
    const result = this.#games
                    .find((game) => game.id === gameId).players
                    .find((player) => player.id = indexPlayer).ships
                    .push(ships);
    if (result) {
      this.startGame(gameId, indexPlayer)
    } else {
      return false;
    }
  }

  startGame (gameId, indexPlayer) {
    return this.#games
            .find((game) => game.id === gameId).players
            .find((player) => player.id = indexPlayer).ships
  }

  attack (gameId, x, y, indexPlayer) {

  }

  randomAttack () {

  }

  turn () {

  }

  finish () {

  }
}

export default Database;
