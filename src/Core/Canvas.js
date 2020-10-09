import React from 'react';
import store from '../store';
import { addRef } from '../StoreFunctions/actions';
import useLoadFiles, { GameInit } from './GameEngine';

const Canvas = () => {
  useLoadFiles();
  const canvasRef = GameInit();
  store.dispatch(addRef(canvasRef));
  return <div style={{ height: '80%', width: '100%' }}><canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight * 0.75} /></div>;
};

export default Canvas;
