import React, { useEffect, useRef } from 'react';
import store from '../store';
import LoadFiles, { GameInit } from './GameEngine';

const Canvas = () => {
  const canvasRef = useRef(null);
  LoadFiles();
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // eslint-disable-next-line max-len
      if (store.getState().loaded === store.getState().sprites.length && store.getState().loaded !== 0) {
        GameInit(canvasRef);
        unsubscribe();
      }
    });
  });
  return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />;
};

export default Canvas;
