import { io } from 'socket.io-client';

const socket = io('ws://localhost:4000');

socket.emit('init', 'Client user init');
