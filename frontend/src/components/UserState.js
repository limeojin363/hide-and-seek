import "./UserState.scss"

const UserState = (props) => {
  const { keyPress } = props;
  const pressStyle = { backgroundColor: "black", color: "white" };

  return (
    <>
      <div className="keyPresses">
        <div className="keyPress up" style={keyPress.up ? pressStyle : null}>↑</div>
        <div className="keyPress down" style={keyPress.down ? pressStyle : null}>↓</div>
        <div className="keyPress right" style={keyPress.right ? pressStyle : null}>←</div>
        <div className="keyPress left" style={keyPress.left ? pressStyle : null}>→</div>
      </div>
    </>
  );
};

export default UserState;
