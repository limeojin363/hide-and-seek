// App.js

import { useEffect, useState, useRef } from "react";
import GameCanvas from "./components/GameCanvas";
import UserStateView from "./components/UserStateView";
import {
  disconnectSocket,
  initSocketConnection,
  sendSocketEvent,
  socket,
} from "./utils/socketio";

const App = () => {
  // 게임의 모든 캐릭터 정보를 담는 state
  const [charList, setCharList] = useState([]);

  // 현재 플레이어의 key 눌림 정보를 담는 state
  const [keyPress, setKeyPress] = useState({
    up: 0,
    down: 0,
    right: 0,
    left: 0,
  });

  const [userStateView, setUserStateView] = useState({
    id: "",
    location: {
      x: 0,
      y: 0,
    },
    keyPress: {
      up: 0,
      down: 0,
      right: 0,
      left: 0,
    },
    overlapped: false,
    radius: 0,
    speed: 0,
  });

  // React canvas 기본 세팅 코드
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState();

  useEffect(() => {
    const canvasCur = canvasRef.current;
    const context = canvasCur.getContext("2d");
    setCtx(context);
  }, []);

  // 처음 렌더링될 때 socket을 연결하고, 백엔드에서 오는 charListUpdate에 반응하도록 lister 등록
  useEffect(() => {
    initSocketConnection();
    socket.on("charListUpdate", (charList) => {
      setCharList(charList);
    });

    socket.on("setId", (id) => {
      setUserStateView({ ...userStateView, id });
    });


    // 브라우저 탭을 닫으면 socket 연결을 끊도록 함
    window.addEventListener("beforeunload", disconnectSocket);
  }, [socket, disconnectSocket, initSocketConnection]);

  // keyPress state가 바뀔 때마다 해당 정보 전송
  useEffect(() => {
    sendSocketEvent("updateKeyPress", keyPress);
  }, [keyPress]);

  // charList 변경을 감지할 때마다 실행
  useEffect(() => {
    drawChar();
    setUserStateView(charList.find((char) => char.id === userStateView.id));
  }, [charList, userStateView]);

  // 캐릭터들을 canvas에 그려주는 함수
  const drawChar = () => {
    // context 뽑아내기
    const canvasCur = canvasRef.current;
    const context = canvasCur.getContext("2d");

    // canvas을 깨끗하게 비워줌 - 안하면 지나간 자리에 그림이 남음
    context.clearRect(0, 0, 500, 500);

    // 각 캐릭터마다 실행
    charList.map((char) => {
      // overlapped는 겹쳤는지를 알려주는 property / 겹쳤으면 다른 색으로 표시
      context.fillStyle = char.overlapped ? "#FF00FF" : "black";
      // 원을 그려줌
      context.beginPath();
      context.arc(
        char.location.x,
        char.location.y,
        char.radius,
        0,
        Math.PI * 2,
        false
      );
      context.closePath();
      context.fill();
    });

    // ctx state 수정
    setCtx(context);
  };

  // 키를 누르고 뗄 때마다 실행시킬 함수
  const onKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      setKeyPress({ ...keyPress, up: 1 });
    } else if (e.key === "ArrowDown") {
      setKeyPress({ ...keyPress, down: 1 });
    } else if (e.key === "ArrowLeft") {
      setKeyPress({ ...keyPress, left: 1 });
    } else if (e.key === "ArrowRight") {
      setKeyPress({ ...keyPress, right: 1 });
    }
  };

  const onKeyUp = (e) => {
    if (e.key === "ArrowUp") {
      setKeyPress({ ...keyPress, up: 0 });
    } else if (e.key === "ArrowDown") {
      setKeyPress({ ...keyPress, down: 0 });
    } else if (e.key === "ArrowLeft") {
      setKeyPress({ ...keyPress, left: 0 });
    } else if (e.key === "ArrowRight") {
      setKeyPress({ ...keyPress, right: 0 });
    }
  };

  return (
    <>
      <GameCanvas
        canvasRef={canvasRef}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      />

      {/* 키 눌림 상태를 시각적으로 보여줌 */}
      {userStateView && <UserStateView keyPress={keyPress} userStateView={userStateView} />}
    </>
  );
};

export default App;
