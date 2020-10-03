import cards from '../Images/cards.gif';
import gameBackground from '../Images/background.jpg';
import store from '../store';
import { addCard, addSprite, toggleLoaded } from '../StoreFunctions/actions';
import { CARDS, GAME_BACKGROUND } from '../Models/stateTypes';

const loadCards = () => {
  let i = 2;
  i = 2;
  while (i <= 15) {
    store.dispatch(addCard('Heart', i === 15 ? 1 : i, 1, i - 2));
    i += 1;
  }
  i = 2;
  while (i <= 15) {
    store.dispatch(addCard('Diamond', i === 15 ? 1 : i, 1, i - 2));
    i += 1;
  }
  i = 2;
  while (i <= 15) {
    store.dispatch(addCard('Club', i === 15 ? 1 : i, 1, i - 2));
    i += 1;
  }
  i = 2;
  while (i <= 15) {
    store.dispatch(addCard('Spade', i === 15 ? 1 : i, 1, i - 2));
    i += 1;
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

const AssetManager = () => {
  loadCards();
  loadSprite(cards, CARDS);
  loadSprite(gameBackground, GAME_BACKGROUND);
};

export default AssetManager;
