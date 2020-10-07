import { combineReducers, createStore } from 'redux';
import { reducerCard, reducerSprite, reducerFinishedLoading, reducerPlayedCards, reducerBank } from './StoreFunctions/reducers';


const combinedStore = combineReducers({
  cards: reducerCard,
  sprites: reducerSprite,
  loaded: reducerFinishedLoading,
  playedCards: reducerPlayedCards,
  bank: reducerBank,
});
const store = createStore(combinedStore);

export default store;
