/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
import { useEffect } from 'react';
import { CARDS, WRONG_CARD } from '../Models/stateTypes';
import store from '../store';
import { changeInterface, playCard } from '../StoreFunctions/actions';
import { isFinishedLoading } from './AssetManager';
import { drawBackground } from './GameEngine';

const drawDeck = (context, x, y, cardsImage) => {
  const cardHeight = cardsImage.image.height / 5;
  const cardWidth = cardsImage.image.width / 13;
  context.drawImage(cardsImage.image, 0, cardsImage.image.height - cardHeight, cardWidth, cardHeight, x, y + 12, cardWidth, cardHeight);
  context.drawImage(cardsImage.image, 0, cardsImage.image.height - cardHeight, cardWidth, cardHeight, x, y + 12 - 3, cardWidth, cardHeight);
  context.drawImage(cardsImage.image, 0, cardsImage.image.height - cardHeight, cardWidth, cardHeight, x, y + 12 - 2 * 3, cardWidth, cardHeight);
  context.drawImage(cardsImage.image, 0, cardsImage.image.height - cardHeight, cardWidth, cardHeight, x, y + 12 - 3 * 3, cardWidth, cardHeight);
  context.drawImage(cardsImage.image, 0, cardsImage.image.height - cardHeight, cardWidth, cardHeight, x, y + 12 - 4 * 3, cardWidth, cardHeight);
};

const drawPlayedCards = (context, cardsImage) => {
  const cardHeight = cardsImage.image.height / 5;
  const cardWidth = cardsImage.image.width / 13;
  const { cards } = store.getState();
  cards.forEach((card) => {
    if (card.played) {
      context.drawImage(cardsImage.image, card.yTile * cardWidth, card.xTile * cardHeight, cardWidth, cardHeight, card.xPosition, card.yPosition, cardWidth, cardHeight);
      context.globalAlpha = 0.2;
      if (card.status === 'higher') {
        context.fillStyle = 'green';
      } else if (card.status === 'lower') {
        context.fillStyle = 'red';
      } else {
        context.fillStyle = 'black';
      }
      context.fillRect(card.xPosition, card.yPosition, cardWidth, cardHeight);
      context.globalAlpha = 1;
    }
  });
};

export const reDraw = (context, cardsImage) => {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  drawBackground(context);
  drawDeck(context, window.innerWidth - window.innerHeight / 3, window.innerHeight / 10, cardsImage);
  drawPlayedCards(context, cardsImage);
};

const checkWin = (check, card) => {
  const cards = store.getState().cards.filter(played => played.played === true);
  const max = cards.reduce((prev, current) => ((prev.xPosition > current.xPosition && prev.yPosition >= current.yPosition) ? prev : current), 0);
  if (check === 'higher') {
    if (card.number > max.number) {
      return true;
    }
    return false;
  } else if (check === 'lower') {
    if (card.number < max.number) {
      return true;
    }
    return false;
  }
};

const flipCard = (context, card, x, y, scaleX, cardsImage, check) => {
  const cardBack = store.getState().sprites.find(sprite => sprite.name === CARDS);
  const cardHeight = cardsImage.image.height / 5;
  const cardWidth = cardsImage.image.width / 13;
  const win = checkWin(check, card);
  context.translate(x + cardWidth / 2, y);
  context.scale(scaleX < 0 ? scaleX * -1 : scaleX, 1);
  if (scaleX >= 0) {
    context.drawImage(cardBack.image, 0 * cardWidth, 4 * cardHeight, cardWidth, cardHeight, -cardWidth / 2, 0, cardWidth, cardHeight);
  } else {
    context.drawImage(cardsImage.image, card.yTile * cardWidth, card.xTile * cardHeight, cardWidth, cardHeight, -cardWidth / 2, 0, cardWidth, cardHeight);
  }
  context.globalAlpha = 0.2;
  if (win || check === 'default') {
    if (check === 'higher') {
      context.fillStyle = 'green';
    } else if (check === 'lower') {
      context.fillStyle = 'red';
    } else {
      context.fillStyle = 'black';
    }
    context.fillRect(-cardWidth / 2, 0, cardWidth, cardHeight);
  } else {
    context.drawImage(store.getState().sprites.find(sprite => sprite.name === WRONG_CARD).image, -cardWidth / 2, 0, cardWidth, cardHeight);
  }
  context.globalAlpha = 1;
  context.setTransform(1, 0, 0, 1, 0, 0); // da popravi canvas size
};

const moveCard = (context, x, y, xDestination, yDestination, frameCountMove) => {
  const cardBack = store.getState().sprites.find(sprite => sprite.name === CARDS);
  const cardHeight = cardBack.image.height / 5;
  const cardWidth = cardBack.image.width / 13;
  let yDest = y;
  let xDest = x;

  if (xDestination < x) {
    xDest -= frameCountMove;
  } else {
    xDest = xDestination;
  }

  if (yDestination > y + frameCountMove) {
    yDest += frameCountMove;
  } else {
    yDest = yDestination;
  }


  context.drawImage(cardBack.image, 0 * cardWidth, 4 * cardHeight, cardWidth, cardHeight, xDest, yDest, cardWidth, cardHeight);
  if (xDest <= xDestination && yDest >= yDestination) {
    return true;
  }
  return false;
};

export const SelectCard = (context, x, y, xDestination, yDestination, cardsImage, check) => { // x and y are starting positions
  let card = store.getState().cards[Math.floor(Math.random() * store.getState().cards.length)];
  while (card.played) {
    card = store.getState().cards[Math.floor(Math.random() * store.getState().cards.length)];
  }

  let frameCount = 1;
  let direction = 1;
  let animationFrameIdMove;
  let animationFrameId;

  let frameCountMove = 1;
  let indicator = false;

  const render = () => {
    frameCount += direction * 0.05;
    if (frameCount > parseFloat(1) || frameCount < parseFloat(-1)) {
      direction *= -1;
    }
    reDraw(context, cardsImage);
    flipCard(context, card, xDestination, yDestination, frameCount, cardsImage, check);
    animationFrameId = window.requestAnimationFrame(render);
    if (frameCount <= -1) {
      // store.dispatch(removeCard(card.type, card.number));
      if (!checkWin(check, card) && check !== 'default') {
        setTimeout(() => {
          store.dispatch(changeInterface());
        }, 2000);
      } else {
        store.dispatch(changeInterface());
      }
      store.dispatch(playCard(card.type, card.number, xDestination, yDestination, check));
      sessionStorage.setItem('cards', JSON.stringify(store.getState().cards));
      window.cancelAnimationFrame(animationFrameId);
    }
  };

  const renderMoveCard = () => {
    frameCountMove += 20;
    reDraw(context, cardsImage);
    indicator = moveCard(context, x, y, xDestination, yDestination, frameCountMove, cardsImage);
    animationFrameIdMove = window.requestAnimationFrame(renderMoveCard);
    if (indicator) {
      window.cancelAnimationFrame(animationFrameIdMove);
      render();
    }
  };
  renderMoveCard();
  return () => checkWin(check, card);
};

export const SelectCardInit = (canvasRef, x, y, xDestination, yDestination) => { // x and y are starting positions
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      if (isFinishedLoading()) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const cardsImage = store.getState().sprites.find(sprite => sprite.name === CARDS);
        if (sessionStorage.getItem('cards')) {
          reDraw(context, cardsImage);
        } else {
          SelectCard(context, x, y, xDestination, yDestination, cardsImage, 'default');
          unsubscribe();
        }
        unsubscribe();
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
        const cardsImage = store.getState().sprites.find(sprite => sprite.name === CARDS);
        drawDeck(context, x, y, cardsImage);
        unsubscribe();
      }
    });
  });
};

export const SelectCardAnimationI = (check) => {
  const canvas = store.getState().canvas.current;
  const context = canvas.getContext('2d');

  const cardsImage = store.getState().sprites.find(sprite => sprite.name === CARDS);
  const cardHeight = cardsImage.image.height / 5;
  const cardWidth = cardsImage.image.width / 13;
  const cards = store.getState().cards.filter(card => card.played === true);
  const max = cards.reduce((prev, current) => ((prev.xPosition > current.xPosition && prev.yPosition >= current.yPosition) ? prev : current));
  let { xPosition, yPosition } = max;
  xPosition += cardWidth;
  if (xPosition > window.innerWidth - window.innerHeight / 3 - cardWidth) {
    xPosition = 50;
    yPosition += cardHeight;
  }
  return SelectCard(context, window.innerWidth - window.innerHeight / 3, window.innerHeight / 10, xPosition, yPosition, cardsImage, check);
};

export const SelectNewCardI = () => {
  const c = store.getState().canvas.current;
  const { sprites } = store.getState();
  const context = c.getContext('2d');
  drawBackground(context);
  reDraw(context, sprites.find(sprite => sprite.name === CARDS));
  SelectCard(context, window.innerWidth - window.innerHeight / 3, window.innerHeight / 10, 50, window.innerHeight / 10, sprites.find(sprite => sprite.name === CARDS), 'default');
};

export const GameView = (canvasRef) => {
  useDrawDeck(canvasRef, window.innerWidth - window.innerHeight / 3, window.innerHeight / 10);
  SelectCardInit(canvasRef, window.innerWidth - window.innerHeight / 3, window.innerHeight / 10, 50, window.innerHeight / 10);
};
