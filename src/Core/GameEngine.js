import { useEffect } from 'react';
import AssetManager from '../Core/AssetManager';
import { drawImage } from '../Functions/drawFunctions';
import { GAME_BACKGROUND } from '../Models/stateTypes';
import store from '../store';


const LoadFiles = () => {
  useEffect(() => {
    AssetManager();
  });
};

const drawBackground = (context) => {
  const gameBackround = store.getState().sprites.find(sprite => sprite.name === GAME_BACKGROUND);
  drawImage(context, gameBackround.image, 0, 0);
};

export const GameInit = (canvasRef) => {
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');
  drawBackground(context);
};

export default LoadFiles;
