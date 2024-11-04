import 'dotenv/config';
import { httpServer } from "./src/http_server/index.js";

const HTTP_PORT = process.env.HTTP_PORT;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT, () => {
  console.log(`Http server listening on ${HTTP_PORT}`);
});
