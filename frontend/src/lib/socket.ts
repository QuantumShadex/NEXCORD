import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:4000';
    socket = io(WS_URL, {
      auth: {
        token: typeof window !== 'undefined' ? localStorage.getItem('nexcord_token') : null,
      },
      autoConnect: false,
    });
  }
  return socket;
}

export function connectSocket() {
  const s = getSocket();
  if (!s.connected) s.connect();
  return s;
}

export function disconnectSocket() {
  if (socket?.connected) socket.disconnect();
}
