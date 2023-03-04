// Character class 생성

let Character = class {
  // 생성자로 id를 받아옴
  constructor(id) {
    // id
    this.id = id;
    // 위치
    this.location = {
      x: 300,
      y: 300,
    };
    // 키 눌림 상태
    this.keyPress = {
      up: 0,
      down: 0,
      right: 0,
      left: 0,
    };
    // 겹쳤는지
    this.overlapped = false;
    // 숨었는지
    this.hidden = false;
    // 반지름
    this.radius = 25;
    // 이동 속도
    this.speed = 3.0;
  }
};

// 캐릭터들을 담을 배열
const charList = [];

// 캐릭터 생성
const createChar = (id) => {
  charList.push(new Character(id));
};

// 캐릭터 제거
const deleteChar = (id) => {
  charList.splice(
    charList.findIndex((char) => char.id === id),
    1
  );
};

// 캐릭터 이동
const moveChar = (id) => {
  charList.map((char) => {
    const { up, down, left, right } = char.keyPress;

    if (
      (up && !down && left && !right) ||
      (up && !down && !left && right) ||
      (!up && down && left && !right) ||
      (!up && down && !left && right)
    ) {
      char.location.y -= up * char.speed * 2 ** -0.5;
      char.location.y += down * char.speed * 2 ** -0.5;
      char.location.x -= left * char.speed * 2 ** -0.5;
      char.location.x += right * char.speed * 2 ** -0.5;
    } else {
      char.location.y -= up * char.speed;
      char.location.y += down * char.speed;
      char.location.x -= left * char.speed;
      char.location.x += right * char.speed;
    }
  });
};

// 키 눌림 상태 업데이트
const updateKeyPress = (id, keyPress) => {
  if (!keyPress) return;
  charList.find((char) => char.id === id).keyPress = keyPress;
};

// 겹쳤는지 계산
const computeOverlapped = () => {
  for (let i = 0; i < charList.length; i++)
    for (let j = 0; j < charList.length; j++) {
      if (i !== j) {
        let x1 = charList[i].location.x;
        let y1 = charList[i].location.y;
        let x2 = charList[j].location.x;
        let y2 = charList[j].location.y;
        let r1 = charList[i].radius;
        let r2 = charList[j].radius;

        charList[i].overlapped = charList[i].overlapped =
          ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5 < r1 + r2;
      }
    }
};

module.exports = {
  createChar,
  deleteChar,
  moveChar,
  updateKeyPress,
  computeOverlapped,
  charList,
};
