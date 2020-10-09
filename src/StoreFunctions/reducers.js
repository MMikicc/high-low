import * as types from '../Models/actionTypes';
// eslint-disable-next-line import/prefer-default-export
export const reducerCard = (state = sessionStorage.getItem('cards') ? JSON.parse(sessionStorage.getItem('cards')) : [], action) => {
  if (action.type === types.CARD_ADDED) {
    return [
      ...state,
      {
        type: action.payload.type,
        number: action.payload.number,
        xTile: action.payload.xTile,
        yTile: action.payload.yTile,
        xPosition: 0,
        yPosition: 0,
        played: false,
        status: 'default',
      },
    ];
  } else if (action.type === types.PLAY_CARD) {
    return state.map((card) => {
      if (card.type === action.payload.type && card.number === action.payload.number) {
        return {
          ...card,
          played: true,
          xPosition: action.payload.xPosition,
          yPosition: action.payload.yPosition,
          status: action.payload.status,
        };
      }
      return { ...card };
    });
  } else if (action.type === types.RESTART) {
    return state.map((card) => {
      if (card.played) {
        return {
          ...card, played: false, xPosition: 0, yPosition: 0, status: 'default',
        };
      }
      return { ...card };
    });
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

export const reducerLoadingInterface = (state = !!sessionStorage.getItem('cards'), action) => {
  if (action.type === types.CHANGE_INTERFACE) {
    return !state;
  }
  return state;
};

// eslint-disable-next-line radix
export const reducerBank = (state = parseInt(sessionStorage.getItem('bank')) ? parseInt(sessionStorage.getItem('bank')) : 100, action) => {
  if (action.type === types.CHANGE_BANK) {
    return state + action.payload.coins;
  }
  return state;
};

export const reducerCanvas = (state = null, action) => {
  if (action.type === types.ADD_REF) {
    return action.payload.ref;
  }
  return state;
};
