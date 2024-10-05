import { createStore } from 'redux';
import rootReducer from './reducers'; // Make sure this points to your root reducer file

const store = createStore(rootReducer);

export default store;