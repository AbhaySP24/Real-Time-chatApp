import { io } from "socket.io-client";

let socket;

export const connectSocket = (userId) => {
  if (!userId) {
    return null;
  }

  socket = io("http://localhost:3000", {
    query: {
      userId,
    },
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
