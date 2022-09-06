import server from './core/http-server/server';
import TcpClient from './core/tcp-client';
import {
  TCP_SERVER_HOST,
  TCP_SERVER_PORT
} from './constants';

(async () => {
  global.tcpClient = new TcpClient(TCP_SERVER_HOST, TCP_SERVER_PORT);

  await server.init();
})();
