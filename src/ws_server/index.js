import { WebSocketServer, WebSocket } from 'ws';

const WS_PORT = process.env.WS_PORT;

const wsServer = new WebSocketServer({
  port: WS_PORT
});

wsServer.on('connection', function(ws) {
  console.log('WS Connected!');

  ws.on('message', function(msg) {
    console.log(`Received message: ${msg}`);
    wsServer.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(`Server received your message: ${msg}`);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
