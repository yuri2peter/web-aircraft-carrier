import http from 'http';
import { Server, Socket } from 'socket.io';
import { z } from 'zod';
import debugLog from './utils/miscs';

interface Client {
  socket: Socket;
  data: {
    socketId: string;
    userId: string;
    sessionId: string;
  };
}

const clientSet = new Set<Client>();

export function startIO(server: http.Server) {
  const io = new Server(server, {
    cors: { origin: '*' },
  });
  io.on('connection', (socket) => {
    const client = {
      socket,
      data: {
        socketId: socket.id,
        sessionId: '',
        userId: '',
      },
    };
    clientSet.add(client);
    socket.on('session', (data) => {
      const { sessionId } = z
        .object({
          sessionId: z.string(),
        })
        .parse(data);
      client.data.sessionId = sessionId;
      debugLog(`[socket] Session [${sessionId}] identified.`);
    });
    socket.on('login', (data) => {
      const { userId } = z
        .object({
          userId: z.string(),
        })
        .parse(data);
      client.data.userId = userId;
      debugLog(`[socket] User [${userId}] logged in.`);
    });
    socket.on('disconnect', () => {
      clientSet.delete(client);
      const { socketId, userId, sessionId } = client.data;
      debugLog(
        `[socket] Client [${userId || sessionId || socketId}] disconnected.`
      );
    });
  });
}

export function sendSocketMsg({
  event,
  data,
  filter = () => true,
}: {
  event: string;
  data: any;
  filter?: (t: Client['data']) => boolean;
}) {
  clientSet.forEach((t) => {
    if (filter(t.data)) {
      t.socket.emit(event, data);
    }
  });
}
