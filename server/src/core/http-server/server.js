import Fastify from 'fastify';
import fastifyStatic from '@fastify/static'
import socketio from 'socket.io';
import { join } from 'path';
import {
  APP_NODE_ENV,
  APP_VERSION,
  APP_TIME_ZONE,
  APP_LANG,
  SERVER_HOST,
  SERVER_PORT,
  IS_DEVELOPMENT
} from '../../constants';
import log from '../../helpers/log';
import corsMiddleware from './middlewares/cors';

const server = {};

let providers = [];
const createProvider = async (id) => {

};

const addProvider = async (id) => {
  providers = providers || [];
  const index = providers.indexOf((p) => p.id === id);
  const obj = await createProvider(id);
}

server.httpServer = {};
server.fastify = Fastify({
  logger: true
});

server.handleOnConnection = (socket) => {
  log.title('Socket Client Connected');

  socket.on('init', async (data) => {
    log.info(`Type: ${data}`);
    log.info(`Socket ID: ${socket.id}`);

    const provider = await addProvider(socket.id);

    if (global.tcpClient.isConnected) {
      socket.emit('ready');
    } else {
      global.tcpClient.ee.on('connected', () => {
        socket.emit('ready');
      })
    }


  });

  socket.once('disconnect', () => {

  });
};

server.listen = async (host, port) => {
  // Socket io connect
  // const io = socketio(server.httpServer);

  const io = IS_DEVELOPMENT
    ? socketio(server.httpServer, {
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"]
        }
      })
    : socketio(server.httpServer);

  io.on('connection', server.handleOnConnection);

  // Server listen
  server.fastify.listen({ host: '0.0.0.0', port: port }, (err, address) => {
    if (err) throw err;

    log.success(`Server is now listening on ${host}:${port} (${address})`)
  })
};

server.bootstrap = async () => {
  const API_VERSION = 'v1';

  server.fastify.register(fastifyStatic, {
    root: join(process.cwd(), 'client/dist'),
    prefix: '/'
  });

  server.fastify.get('/', (request, reply) => {
    reply.sendFile('index.html')
  });

  server.httpServer = server.fastify.server;

  try {
    await server.listen(SERVER_HOST, SERVER_PORT);
  } catch (e) {
    log.error(e.message);
  }
};

server.init = async () => {
  // INFO
  log.title('Init Server');
  log.success(`APP_NODE_ENV: ${APP_NODE_ENV}`);
  log.success(`APP_VERSION: ${APP_VERSION}`);
  log.success(`APP_TIME_ZONE: ${APP_TIME_ZONE}`);

  server.fastify.addHook('onRequest', corsMiddleware);

  await server.bootstrap();
};

export default server;
