import { createStore } from 'redux';

import combinedReducer from './reducers';
import storage from './storage';

const persistedSessionState = storage.session.loadState();
const persistedLocalState = storage.local.loadState();
const store = createStore(combinedReducer, {
	...persistedLocalState,
	...persistedSessionState
});

store.subscribe(() => {
	const { settings, ...sessionData } = store.getState();
	storage.session.saveState(sessionData);
	storage.local.saveState({ settings });
});

export default store;
