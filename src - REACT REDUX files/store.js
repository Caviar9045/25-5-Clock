    // 25 + 5 Project //
// © Created by Caviar9045 //

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
