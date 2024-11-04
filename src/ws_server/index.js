import { WebSocketServer, WebSocket } from 'ws';
import reg from '../controllers/reg.js';
import createGame from '../controllers/createGame.js';
import startGame from '../controllers/startGame.js';
import turn from '../controllers/turn.js';
import attack from '../controllers/attack.js';
import randomAttack from '../controllers/randomAttack.js';
import finish from '../controllers/finish.js';
import updateWinners from '../controllers/updateWinners.js';
import updateRoom from '../controllers/updateRoom.js';
import createRoom from '../controllers/createRoom.js';
import addShips from '../controllers/addShips.js';
import addUserToRoom from '../controllers/addUserToRoom.js';
import { v4 as uuidv4 } from 'uuid';

const WS_PORT = process.env.WS_PORT;

const wsServer = new WebSocketServer({
  port: WS_PORT
});

const lookup = {};

wsServer.on('connection', function(ws) {
  console.log('WS Connected!');
  ws.id = uuidv4();
  lookup[ws.id] = ws;

  ws.on('message', function(msg) {
    console.log(`Received message: ${msg}`);
    let { type, data, id } = JSON.parse(msg);
    data = data ? JSON.parse(data) : "";
    let regData, roomsData, winnersData, response;
    switch (type) {
      case 'reg':
        regData = reg(id, data, ws.id);
        roomsData = updateRoom(id);
        winnersData = updateWinners(id);
        lookup[ws.id].send(JSON.stringify(regData));
        lookup[ws.id].send(JSON.stringify(roomsData));
        lookup[ws.id].send(JSON.stringify(winnersData));
        break;
      case 'create_room':
        createRoom();
        roomsData = updateRoom(id);
        wsServer.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(roomsData));
          }
        });
        break;
      case 'add_user_to_room':
        const roomUsers = addUserToRoom(data.indexRoom, ws.id);
        if (roomUsers.length === 2) {
          const idGame = createGame(id, data.indexRoom);
          wsServer.clients.forEach((client) => {
            if (client.id === roomUsers[0].id || client.id === roomUsers[1].id) {
              client.send(JSON.stringify({
                type: "create_game",
                data: JSON.stringify({ idGame, idPlayer: client.id}),
                id
              }));
            }
          });
        }
        roomsData = updateRoom(id);
        wsServer.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(roomsData));
          }
        });
        break;
      case 'add_ships':
        const readyState = addShips(data);
        if (readyState) {
          response = startGame(data);
          response.players.forEach((player) => {
            lookup[player.id].send(JSON.stringify({
              type: "start_game",
              data: JSON.stringify({ ships: player.ships, currentPlayerIndex: player.id }),
              id
            }));
          });
          response.players.forEach((player) => {
            lookup[player.id].send(JSON.stringify({
              type: "turn",
              data: JSON.stringify({ currentPlayer: response.players[0].id }),
              id
            }));
          });
        }
        break;
      case 'attack':
        response = attack(data);
        response.players.forEach((player) => {
          lookup[player.id].send(JSON.stringify({
            type: "attack",
            data: JSON.stringify({ ...response.feedback, currentPlayer: data.indexPlayer }),
            id
          }));
        });
        if (response.win) {
          response.players.forEach((player) => {
            lookup[player.id].send(JSON.stringify({
              type: "finish",
              data: JSON.stringify(finish(response.win)),
              id
            }));
          });
          winnersData = updateWinners(id);
          response.players.forEach((player) => {
            lookup[player.id].send(JSON.stringify(winnersData));
          });
        } else {
          response.players.forEach((player) => {
            lookup[player.id].send(JSON.stringify({
              type: "turn",
              data: JSON.stringify({
                currentPlayer: response.players.find((player) => player.id !== data.indexPlayer).id
              }),
              id
            }));
          });
        }
        break;
      case 'randomAttack':
        response = randomAttack(data);
        response.players.forEach((player) => {
          lookup[player.id].send(JSON.stringify({
            type: "attack",
            data: JSON.stringify({ ...response.feedback, currentPlayer: data.indexPlayer }),
            id
          }));
        });
        if (!response.win) {
          response.players.forEach((player) => {
            lookup[player.id].send(JSON.stringify({
              type: "turn",
              data: JSON.stringify({
                currentPlayer: response.players.find((player) => player.id !== data.indexPlayer).id
              }),
              id
            }));
          });
        } else {
          response.players.forEach((player) => {
            lookup[player.id].send(JSON.stringify({
              type: "finish",
              data: JSON.stringify(finish(response.win)),
              id
            }));
          });
          winnersData = updateWinners(id);
          response.players.forEach((player) => {
            lookup[player.id].send(JSON.stringify(winnersData));
          });
        }
        break;
      default:
        console.log('Unknown message type');
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
