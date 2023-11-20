import http from 'http';
import { Server, Socket } from 'socket.io';

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
    socket.on('session', (sessionId: string) => {
      client.data.sessionId = sessionId;
      console.log(`[socket] Session ${sessionId} identified.`);
    });
    socket.on('login', (userId: string) => {
      client.data.userId = userId;
      console.log(`[socket] User ${userId} logged in.`);
    });
    socket.on('disconnect', () => {
      clientSet.delete(client);
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
