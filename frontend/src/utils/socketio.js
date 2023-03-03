// socketio.js

import { io } from "socket.io-client";

export let socket = io("http://localhost:8080", {
  transports: ["websocket"],
});

export const initSocketConnection = () => {
  if (socket) return;
  socket.connect();
};

// 이벤트 명을 지정하고 데이터를 보냄
export const sendSocketEvent = (eventName, data) => {
  if (socket == null || socket.connected === false) {
    initSocketConnection();
  }
  socket.emit(eventName, data);
};

// 소켓 연결을 끊음
export const disconnectSocket = () => {
  console.log(1);
  if (socket == null || socket.connected === false) {
    return;
  }
  console.log(2);
  socket.disconnect();
  socket = undefined;
};
