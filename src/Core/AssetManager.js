import cards from '../Images/cards.gif';
import x from '../Images/x.png';
import gameBackground from '../Images/background.jpg';
import store from '../store';
import { addCard, addSprite, toggleLoaded } from '../StoreFunctions/actions';
import { CARDS, GAME_BACKGROUND, WRONG_CARD } from '../Models/stateTypes';

const loadCards = () => {
  let i = 2;
  let j = 2;
  while (i <= 14) {
    if (j === 11) {
      j += 1;
    }
    store.dispatch(addCard('Heart', j === 15 ? 1 : j, 0, i - 2));
    i += 1;
    j += 1;
  }
  i = 2;
  j = 2;
  while (i <= 14) {
    if (j === 11) {
      j += 1;
    }
    store.dispatch(addCard('Diamond', j === 15 ? 1 : j, 1, i - 2));
    i += 1;
    j += 1;
  }
  i = 2;
  j = 2;
  while (i <= 14) {
    if (j === 11) {
      j += 1;
    }
    store.dispatch(addCard('Club', j === 15 ? 1 : j, 2, i - 2));
    i += 1;
    j += 1;
  }
  i = 2;
  j = 2;
  while (i <= 14) {
    if (j === 11) {
      j += 1;
    }
    store.dispatch(addCard('Spade', j === 15 ? 1 : j, 3, i - 2));
    i += 1;
    j += 1;
  }
};

const loadSprite = (sprite, name) => {
  const image = new Image();
  image.src = sprite;
  store.dispatch(toggleLoaded());
  image.onload = () => {
    store.dispatch(addSprite(image, name));
  };
};

export const isFinishedLoading = () => {
  if (store.getState().loaded === store.getState().sprites.length && store.getState().loaded !== 0) {
    return true;
  }
  return false;
};

const AssetManager = () => {
  loadCards();
  loadSprite(cards, CARDS);
  loadSprite(x, WRONG_CARD);
  loadSprite(gameBackground, GAME_BACKGROUND);
};

export default AssetManager;
