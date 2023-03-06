import "./UserStateView.scss";

const UserStateView = (props) => {
  const { userStateView, updateSpeed } = props;
  const { keyPress } = userStateView;

  return (
    <div className="UserStateView">
      <div className="keyPresses">
        <div className={`keyPress up ${keyPress.ArrowUp && "pressed"}`}>↑</div>
        <div className={`keyPress down ${keyPress.ArrowDown && "pressed"}`}>
          ↓
        </div>
        <div className={`keyPress left ${keyPress.ArrowLeft && "pressed"}`}>
          ←
        </div>
        <div className={`keyPress right ${keyPress.ArrowRight && "pressed"}`}>
          →
        </div>
      </div>
      <div className="otherStates">
        <div>id: {userStateView.id}</div>
        <div>x: {userStateView.location.x}</div>
        <div>y: {userStateView.location.y}</div>
        <div>overlapped: {userStateView.overlapped ? "true" : "false"}</div>
        <div>hidden: {userStateView.hidden ? "true" : "false"}</div>
        <div>
          speed: {userStateView.speed}
          <button onClick={() => {updateSpeed("+1")}}>+1</button>
          <button onClick={() => {updateSpeed("-1")}}>-1</button>
        </div>
      </div>
    </div>
  );
};

export default UserStateView;
