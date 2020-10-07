
import { useEffect } from 'react';
/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
import { CARDS } from '../Models/stateTypes';
import store from '../store';
import { playCard } from '../StoreFunctions/actions';
import { isFinishedLoading } from './AssetManager';
import { drawBackground } from './GameEngine';

const drawDeck = (context, x, y) => {
  const cards = store.getState().sprites.find(sprite => sprite.name === CARDS);
  const cardHeight = cards.image.height / 5;
  const cardWidth = cards.image.width / 13;
  context.drawImage(cards.image, 0, cards.image.height - cardHeight, cardWidth, cardHeight, x, y, cardWidth, cardHeight);
  context.drawImage(cards.image, 0, cards.image.height - cardHeight, cardWidth, cardHeight, x, y - 3, cardWidth, cardHeight);
  context.drawImage(cards.image, 0, cards.image.height - cardHeight, cardWidth, cardHeight, x, y - 2 * 3, cardWidth, cardHeight);
  context.drawImage(cards.image, 0, cards.image.height - cardHeight, cardWidth, cardHeight, x, y - 3 * 3, cardWidth, cardHeight);
  context.drawImage(cards.image, 0, cards.image.height - cardHeight, cardWidth, cardHeight, x, y - 4 * 3, cardWidth, cardHeight);
};

export const reDraw = (context) => {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  drawBackground(context);
  drawDeck(context, window.innerWidth - window.innerHeight / 3, window.innerHeight / 10);
};

const flipCard = (context, card, x, y, scaleX) => {
  const cards = store.getState().sprites.find(sprite => sprite.name === CARDS);
  const cardBack = store.getState().sprites.find(sprite => sprite.name === CARDS);
  const cardHeight = cards.image.height / 5;
  const cardWidth = cards.image.width / 13;
  context.translate(x + cardWidth / 2, -12 + y);
  context.scale(scaleX < 0 ? scaleX * -1 : scaleX, 1);
  if (scaleX >= 0) {
    context.drawImage(cardBack.image, 0 * cardWidth, 4 * cardHeight, cardWidth, cardHeight, -cardWidth / 2, 0, cardWidth, cardHeight);
  } else {
    context.drawImage(cards.image, card.yTile * cardWidth, card.xTile * cardHeight, cardWidth, cardHeight, -cardWidth / 2, 0, cardWidth, cardHeight);
  }
  // context.beginPath();
  // context.rect(-cardWidth / 2, y, cardWidth, cardHeight);
  // context.strokeStyle = 'rgba(255,215,0,0.8)';
  // context.stroke();
  context.setTransform(1, 0, 0, 1, 0, 0); // da popravi canvas size
};

const moveCard = (context, x, y, frameCountMove) => {
  const cardBack = store.getState().sprites.find(sprite => sprite.name === CARDS);
  const cardHeight = cardBack.image.height / 5;
  const cardWidth = cardBack.image.width / 13;

  context.drawImage(cardBack.image, 0 * cardWidth, 4 * cardHeight, cardWidth, cardHeight, x, y + frameCountMove, cardWidth, cardHeight);
  if (y + frameCountMove > cardHeight * 3) {
    return y + frameCountMove;
  }
  return false;
};

const SelectCard = (canvasRef, x, y) => {
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      if (isFinishedLoading()) {
        const card = store.getState().cards[Math.floor(Math.random() * store.getState().cards.length)];
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        let frameCount = 1;
        let direction = 1;
        let animationFrameIdMove;
        let animationFrameId;
        let positionY = 0;

        let frameCountMove = 1;
        let indicator = false;

        const render = () => {
          frameCount += direction * 0.05;
          if (frameCount > parseFloat(1) || frameCount < parseFloat(-1)) {
            direction *= -1;
          }
          reDraw(context);
          flipCard(context, card, x, positionY, frameCount);
          animationFrameId = window.requestAnimationFrame(render);
          if (frameCount <= -1) {
            store.dispatch(playCard(card.type, card.number, card.xTile, card.yTile));
            window.cancelAnimationFrame(animationFrameId);
          }
        };

        const renderMoveCard = () => {
          frameCountMove += 5;
          reDraw(context);
          indicator = moveCard(context, x, y, frameCountMove);
          animationFrameIdMove = window.requestAnimationFrame(renderMoveCard);
          if (indicator) {
            window.cancelAnimationFrame(animationFrameIdMove);
            positionY = indicator;
            render();
          }
        };
        renderMoveCard();
        unsubscribe();
        return () => {
          window.cancelAnimationFrame(animationFrameId);
          window.cancelAnimationFrame(animationFrameIdMove);
        };
      }
    });
  });
};

const useDrawDeck = (canvasRef, x, y) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const unsubscribe = store.subscribe(() => {
      if (isFinishedLoading()) {
        drawDeck(context, x, y);
        unsubscribe();
      }
    });
  });
};

const GameView = (canvasRef) => {
  useDrawDeck(canvasRef, window.innerWidth - window.innerHeight / 3, window.innerHeight / 10);
  SelectCard(canvasRef, window.innerWidth - window.innerHeight / 3, window.innerHeight / 10);
};

export default GameView;
