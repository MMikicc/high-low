import { combineReducers, createStore } from 'redux';
import { reducerCard, reducerSprite, reducerFinishedLoading } from './StoreFunctions/reducers';


const combinedStore = combineReducers({
  cards: reducerCard,
  sprites: reducerSprite,
  loaded: reducerFinishedLoading,
});
const store = createStore(combinedStore);

export default store;
