import { combineReducers, createStore } from 'redux';
import { reducerCard, reducerSprite, reducerFinishedLoading, reducerBank, reducerCanvas, reducerLoadingInterface } from './StoreFunctions/reducers';


const combinedStore = combineReducers({
  cards: reducerCard,
  sprites: reducerSprite,
  loaded: reducerFinishedLoading,
  bank: reducerBank,
  canvas: reducerCanvas,
  interface: reducerLoadingInterface,
});
const store = createStore(combinedStore);

export default store;
