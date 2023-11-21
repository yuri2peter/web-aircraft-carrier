import { nanoid } from 'nanoid';
import { io } from 'socket.io-client';
import { SERVER_ORIGIN, USE_SOCKET } from 'src/configs';
import debugLog from 'src/utils/debugLog';

const userId = 'guest';
const sessionId = nanoid();
export const socket = io(SERVER_ORIGIN, {
  autoConnect: USE_SOCKET,
});
socket.on('connect', () => {
  debugLog('Socket connected.');
  socket.emit('session', { sessionId });
  socket.emit('login', { userId });
});
socket.on('connect_error', () => {
  debugLog('Socket connect error.');
});
socket.on('disconnect', () => {
  debugLog('Socket disconnected.');
});
