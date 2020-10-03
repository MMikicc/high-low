import * as types from '../Models/actionTypes';
// eslint-disable-next-line import/prefer-default-export
export const reducerCard = (state = [], action) => {
  if (action.type === types.CARD_ADDED) {
    return [
      ...state,
      {
        type: action.payload.type,
        number: action.payload.number,
        xTile: action.payload.xTile,
        yTile: action.payload.yTile,
        played: false,
      },
    ];
  } else if (action.type === types.CARD_REMOVED) {
    return state.filter(card => card.type !== action.payload.type &&
        card.number !== action.payload.description);
  }
  return state;
};

export const reducerSprite = (state = [], action) => {
  if (action.type === types.SPRITE_ADDED) {
    return [
      ...state,
      {
        image: action.payload.image,
        name: action.payload.name,
      },
    ];
  }
  return state;
};

export const reducerFinishedLoading = (state = 0, action) => {
  if (action.type === types.CHANGE_STATE) {
    return state + 1;
  }
  return state;
};
