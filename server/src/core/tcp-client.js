import Net from 'net';
import { EventEmitter } from 'events';
import log from '../helpers/log';

export default class TcpClient {
  constructor(host, port) {
    this.host = host;
    this.port = port;

    this.tcpSocket = new Net.Socket();
    this._ee = new EventEmitter();
    this._status = this.tcpSocket.readyState;
    this._isConnected = false;

    log.title('TCP Client');
    log.success('New Instance');

    this.tcpSocket.on('connect', () => {
      log.title('TCP Client');
      log.success(`Connected to the TCP server tcp://${this.host}:${this.port}`);

      this._isConnected = true;
      this._ee.emit('connected', null);
    });
  }

  get status() {
    return this._status;
  }

  get ee() {
    return this._ee;
  }

  get isConnected() {
    return this._isConnected;
  }

  emit(topic, data) {
    const obj = { topic, data };

    this.tcpSocket.write(JSON.stringify(obj));
  }

  connect() {
    this.tcpSocket.connect({
      host: this.host,
      port: this.port
    });
  }
}
