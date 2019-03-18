import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import combinedReducer from './reducers';
import storage from './storage';

const persistedSessionState = storage.session.loadState();
const persistedLocalState = storage.local.loadState();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	combinedReducer,
	{
		...persistedLocalState,
		...persistedSessionState
	},
	composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
	const { settings, ...sessionData } = store.getState();
	storage.session.saveState(sessionData);
	storage.local.saveState({ settings });
});

export default store;
