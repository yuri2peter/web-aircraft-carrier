import { io } from 'socket.io-client';
import { nanoid } from 'nanoid';
import React, { useLayoutEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { SERVER_ORIGIN } from 'src/defines/constants';

const socketUserId = nanoid();

function useSocket() {
  useLayoutEffect(() => {
    const socket = io(SERVER_ORIGIN);
    socket.on('connect', () => {
      console.log('Socket connected.');
      socket.emit('login', socketUserId);
    });
    socket.on('connect_error', () => {
      console.log('Socket connect error.');
    });
    socket.on('disconnect', () => {
      console.log('Socket disconnected.');
    });
    return () => {
      socket.disconnect();
    };
  }, []);
}

const AppGuard: React.FC = () => {
  console.log('AppGuard loaded.');
  useSocket();
  return <Outlet />;
};

export default AppGuard;
