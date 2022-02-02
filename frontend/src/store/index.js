import { createStore, compose, applyMiddleware } from 'redux';
import reducer from '../reducer';
import middleware from '../middleware';

// == Enhancers
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    middleware,
  ),
);

// == Store
const store = createStore(
  reducer,
  enhancers,
);

// == Export
export default store;