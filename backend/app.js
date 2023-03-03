// app.js

// express와 cors 기본 설정
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

// 8080 포트에 서버 열기
const server = app.listen(8080, () => {
  console.log("listening on 8080");
});

// socket.io와 charCtr 파일 불러오기
const io = require("socket.io")(server);
const charCtr = require("./charCtr");

// 소켓 연결이 감지되면
io.on("connect", (socket) => {
  console.log("Client Connected!");

  // 캐릭터 생성 함수를 실행
  charCtr.createChar(socket.id);
  io.emit("charListUpdate", charCtr.charList);

  // 리스너 등록: 연결 해제시 해당 캐릭터 제거
  socket.on("disconnect", () => {
    charCtr.deleteChar(socket.id);
    // 이후 변경된 charList 전송
    io.emit("charListUpdate", charCtr.charList);
  });

  // 리스너 등록: 키 눌림 상태 변경
  socket.on("updateKeyPress", (keyPress) => {
    charCtr.updateKeyPress(socket.id, keyPress);
    // 이후 변경된 charList 전송
    io.emit("charListUpdate", charCtr.charList);
  });

  // 키 눌림 상태에 따라 일정 간격으로 캐릭터 이동, 서로 겹쳤는지 계산
  setInterval(() => {
    charCtr.moveChar();
    charCtr.computeOverlapped();
    // 이후 변경된 charList 전송
    io.emit("charListUpdate", charCtr.charList);
  }, 10);
});
