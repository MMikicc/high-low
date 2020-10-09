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

export const removeCard = (type, number) => ({
  type: types.CARD_REMOVED,
  payload: {
    type,
    number,
  },
});

export const restartCards = () => ({
  type: types.RESTART,
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

export const playCard = (type, number, xPosition, yPosition, status) => ({
  type: types.PLAY_CARD,
  payload: {
    type,
    number,
    xPosition,
    yPosition,
    status,
  },
});

export const changeBank = coins => ({
  type: types.CHANGE_BANK,
  payload: {
    coins,
  },
});

export const changeInterface = () => ({
  type: types.CHANGE_INTERFACE,
});


export const addRef = ref => ({
  type: types.ADD_REF,
  payload: {
    ref,
  },
});
