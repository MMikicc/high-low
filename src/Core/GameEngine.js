import { useEffect } from 'react';
import { drawImage } from '../Functions/drawFunctions';
import gameBackground from '../Images/background.jpg';

const InitGame = (canvasRef) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    drawImage(context, gameBackground, 0, 0);
  });
};

export default InitGame;
