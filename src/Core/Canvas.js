import React, { useRef } from 'react';
import GameInit from './GameEngine';

const Canvas = () => {
  const canvasReff = useRef(null);
  GameInit(canvasReff);
  return <canvas ref={canvasReff} width={window.innerWidth} height={window.innerHeight} />;
};

export default Canvas;
