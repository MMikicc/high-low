import React from 'react';
import useLoadFiles, { GameInit } from './GameEngine';

const Canvas = () => {
  useLoadFiles();
  const canvasRef = GameInit();
  return <div style={{ height: '80%', width: '100%' }}><canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight * 0.75} /></div>;
};

export default Canvas;
