import "./GameCanvas.scss";

const GameCanvas = (props) => {
  const { onKeyDown, onKeyUp, canvasRef } = props;

  return (
    <canvas
      ref={canvasRef}
      height="400"
      width="400"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      tabIndex={0}
    ></canvas>
  );
};

export default GameCanvas;
