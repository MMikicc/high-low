import * as types from '../Models/actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const addCard = (type, number, xTile, yTile) => ({
  type: types.CARD_ADDED,
  payload: {
    type,
    number,
    xTile,
    yTile,
  },
});

export const addSprite = (image, name) => ({
  type: types.SPRITE_ADDED,
  payload: {
    image,
    name,
  },
});

export const toggleLoaded = () => ({
  type: types.CHANGE_STATE,
});

export const playCard = (type, number, xTile, yTile) => ({
  type: types.PLAY_CARD,
  payload: {
    type,
    number,
    xTile,
    yTile,
  },
});
