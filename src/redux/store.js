import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import combinedReducer from './reducers';
import storage from './storage';

// Add logging middleware for dev environment
const middlewares = [thunk];
const { logger } =
  process.env.NODE_ENV === 'development'
  	? require('redux-logger')
  	: { logger: null };

if (logger) {
	middlewares.push(logger);
}

// Load persistent data from session and local storage
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

// Listen to store changes and persist data
store.subscribe(() => {
	const {
		authReducer,
		ethereumReducer,
		settingsReducer,
		userReducer
	} = store.getState();
	const { balance, currency, transactions } = ethereumReducer;

	// Persistent fields
	const { value } = balance;
	const { base, lastUpdated: currencyLastUpdated, rates } = currency;
	const { byIds, list } = transactions;
	const { lastUpdated: authLastUpdated, sessionAuth } = authReducer;
	const { apiKey, currency: preferredCurrency, nightMode } = settingsReducer;
	const { address } = userReducer.ethAccount;

	storage.local.saveState({
		authReducer: {
			lastUpdated: authLastUpdated,
			sessionAuth
		},
		ethereumReducer: {
			balance: {
				value
			},
			currency: {
				base,
				lastUpdated: currencyLastUpdated,
				rates
			},
			transactions: {
				byIds,
				list
			}
		},
		settingsReducer: {
			apiKey,
			currency: preferredCurrency,
			nightMode
		},
		userReducer: {
			ethAccount: {
				address
			}
		}
	});
});

export default store;
