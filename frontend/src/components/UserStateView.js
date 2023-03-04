import "./UserStateView.scss";

const UserStateView = (props) => {
  const { userStateView } = props;
  const { keyPress } = userStateView;

  return (
    <div className="UserStateView">
      <div className="keyPresses">
        <div className={`keyPress up ${keyPress.up && "pressed"}`}>↑</div>
        <div className={`keyPress down ${keyPress.down && "pressed"}`}>↓</div>
        <div className={`keyPress left ${keyPress.left && "pressed"}`}>←</div>
        <div className={`keyPress right ${keyPress.right && "pressed"}`}>→</div>
      </div>
      <div className="otherStates">
        <div>id: {userStateView.id}</div>
        <div>x: {userStateView.location.x}</div>
        <div>y: {userStateView.location.y}</div>
        <div>overlapped: {userStateView.overlapped ? "true" : "false"}</div>
        <div>speed: {userStateView.speed}</div>
      </div>
    </div>
  );
};

export default UserStateView;
