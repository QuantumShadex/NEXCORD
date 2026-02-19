import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    // Use current origin so Socket.IO goes through nginx (or Next.js rewrite)
    const WS_URL = typeof window !== 'undefined'
      ? window.location.origin
      : (process.env.API_URL || 'http://localhost:4000');
    socket = io(WS_URL, {
      path: '/socket.io',
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
