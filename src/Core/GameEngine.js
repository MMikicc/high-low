import { useEffect, useRef } from 'react';
import AssetManager, { isFinishedLoading } from '../Core/AssetManager';
import { drawImage } from '../Functions/drawFunctions';
import { GAME_BACKGROUND } from '../Models/stateTypes';
import store from '../store';
import GameView from './GameView';


const useLoadFiles = () => {
  useEffect(() => {
    AssetManager();
  });
};

export const drawBackground = (context) => {
  const gameBackround = store.getState().sprites.find(sprite => sprite.name === GAME_BACKGROUND);
  drawImage(context, gameBackround.image, 0, 0, window.innerWidth, window.innerHeight);
};

const useDrawBackground = (canvasRef) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const unsubscribe = store.subscribe(() => {
      if (isFinishedLoading()) {
        drawBackground(context);
        unsubscribe();
      }
    });
  });
};


export const GameInit = () => {
  const canvasRef = useRef();
  useDrawBackground(canvasRef);
  GameView(canvasRef);

  return canvasRef;
};

export default useLoadFiles;
