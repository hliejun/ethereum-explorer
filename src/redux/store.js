import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { initialState as initialAuthState } from './reducers/auth';
import { initialState as initialEthereumState } from './reducers/ethereum';
import { initialState as initialSettingsState } from './reducers/settings';
import { initialState as initialUserState } from './reducers/user';

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

/**
 * NOTE:
 * Need to deep merge local and session such that
 * session state does not nullify local state and
 * intial state on fields that it did not persist
 */

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
			...initialAuthState,
			lastUpdated: authLastUpdated,
			sessionAuth
		},
		ethereumReducer: {
			...initialEthereumState,
			balance: {
				...initialEthereumState.balance,
				value
			},
			currency: {
				...initialEthereumState.currency,
				base,
				lastUpdated: currencyLastUpdated,
				rates
			},
			transactions: {
				...initialEthereumState.transactions,
				byIds,
				list
			}
		},
		settingsReducer: {
			...initialSettingsState,
			apiKey,
			currency: preferredCurrency,
			nightMode
		},
		userReducer: {
			...initialUserState,
			ethAccount: {
				...initialUserState.ethAccount,
				address
			}
		}
	});
});

export default store;
