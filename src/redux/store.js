import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import combinedReducer from './reducers';
import storage from './storage';

const middlewares = [thunk];
const { logger } =
  process.env.NODE_ENV === 'development'
  	? require('redux-logger')
  	: { logger: null };

if (logger) {
	middlewares.push(logger);
}

const persistedSessionState = storage.session.loadState();
const persistedLocalState = storage.local.loadState();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	combinedReducer,
	{
		...persistedLocalState,
		...persistedSessionState
	},
	composeEnhancers(applyMiddleware(...middlewares))
);

// TODO: Selectively destructure and persist data (different storage types)
store.subscribe(() => {
	const { ...data } = store.getState();
	storage.local.saveState(data);
});

export default store;
