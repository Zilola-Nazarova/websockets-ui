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

const WS_PORT = process.env.WS_PORT;

const wsServer = new WebSocketServer({
  port: WS_PORT
});

wsServer.on('connection', function(ws) {
  console.log('WS Connected!');

  ws.on('message', function(msg) {
    console.log(`Received message: ${msg}`);
    const msgJSON = JSON.parse(msg);
    const dataJSON = JSON.parse(msgJSON.data);
    let responseData;
    switch (msgJSON.type) {
      case 'reg':
        responseData = reg(msgJSON.type, dataJSON, msgJSON.id);
        break;
      case 'create_game':
        responseData = createGame(msgJSON);
        break;
      case 'start_game':
        responseData = startGame(msgJSON);
        break;
      case 'turn':
        responseData = turn(msgJSON);
        break;
      case 'attack':
        responseData = attack(msgJSON);
        break;
      case 'random_attack':
        responseData = randomAttack(msgJSON);
        break;
      case'finish':
        responseData = finish(msgJSON);
        break;
      case 'update_winners':
        responseData = updateWinners(msgJSON);
        break;
      case 'create_room':
        responseData = createRoom(msgJSON);
        break;
      case 'update_room':
        responseData = updateRoom(msgJSON);
        break;
      case 'add_ships':
        responseData = addShips(msgJSON);
        break;
      case 'add_user_to_room':
        responseData = addUserToRoom(msgJSON);
        break;
      default:
        console.log('Unknown message type');
    }

    console.log(`Response message: ${JSON.stringify(responseData)}`);

    wsServer.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(`Server received your message: ${msg}`);
      }
      if (client == ws) {
        console.log('Sending response');
        client.send(JSON.stringify(responseData));
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
