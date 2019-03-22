import { ETHEREUM } from '../actions/types';

const initialState = {
	balance: {
		error: null,
		isLoading: false,
		value: null
	},
	transactions: {
		byIds: {},
		error: null,
		isLoading: false,
		list: []
	},
	currency: {
		base: 'USD',
		error: null,
		isLoading: false,
		lastUpdated: null,
		rates: {}
	}
};

const ethereumReducer = (state = initialState, action) => {
	switch (action.type) {
	case ETHEREUM.UPDATE_BALANCE_STARTED: {
		return {
			...state,
			balance: {
				...state.balance,
				isLoading: true
			}
		};
	}
	case ETHEREUM.UPDATE_BALANCE_SUCCESS: {
		const { balance } = action.payload;
		return {
			...state,
			balance: {
				...state.balance,
				error: null,
				isLoading: false,
				value: balance
			}
		};
	}
	case ETHEREUM.UPDATE_BALANCE_ERROR: {
		const { error } = action.payload;
		return {
			...state,
			balance: {
				...state.balance,
				error,
				isLoading: false
			}
		};
	}
	case ETHEREUM.CLEAR_BALANCE: {
		return {
			...state,
			balance: {
				...state.balance,
				value: null
			}
		};
	}
	case ETHEREUM.UPDATE_TRANSACTIONS_STARTED: {
		return {
			...state,
			transactions: {
				...state.transactions,
				isLoading: true
			}
		};
	}
	case ETHEREUM.UPDATE_TRANSACTIONS_SUCCESS: {
		const { transactions } = action.payload;
		const updatedTransactions = { ...state.transactions.byIds };
		const transactionsList = [];
		transactions.forEach(transaction => {
			updatedTransactions[transaction.id] = transaction;
			transactionsList.push(transaction.id);
		});
		return {
			...state,
			transactions: {
				...state.transactions,
				byIds: updatedTransactions,
				error: null,
				isLoading: false,
				list: transactionsList
			}
		};
	}
	case ETHEREUM.UPDATE_TRANSACTIONS_ERROR: {
		const { error } = action.payload;
		return {
			...state,
			transactions: {
				...state.transactions,
				error,
				isLoading: false
			}
		};
	}
	case ETHEREUM.CLEAR_TRANSACTIONS: {
		return {
			...state,
			transactions: {
				...state.transactions,
				byIds: {},
				list: []
			}
		};
	}
	case ETHEREUM.UPDATE_CURRENCY_RATES_STARTED: {
		return {
			...state,
			currency: {
				...state.currency,
				isLoading: true
			}
		};
	}
	case ETHEREUM.UPDATE_CURRENCY_RATES_SUCCESS: {
		const { base, rates, timestamp } = action.payload;
		return {
			...state,
			currency: {
				...state.currency,
				base,
				error: null,
				isLoading: false,
				lastUpdated: timestamp,
				rates: {
					...state.currency.rates,
					...rates
				}
			}
		};
	}
	case ETHEREUM.UPDATE_CURRENCY_RATES_ERROR: {
		const { error } = action.payload;
		return {
			...state,
			currency: {
				...state.currency,
				error,
				isLoading: false
			}
		};
	}
	default:
		return state;
	}
};

export default ethereumReducer;
