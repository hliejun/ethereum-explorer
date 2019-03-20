import { ETHEREUM } from '../actions/types';

// import {
// 	stubbedIds,
// 	stubbedSummary,
// 	stubbedTransactions
// } from '../../components/scenes/Portfolio/_stubbedValues';

const initialState = {
	balance: {
		error: null,
		isLoading: false,
		value: null
		// value: stubbedSummary.balance
	},
	transactions: {
		byIds: {},
		// byIds: stubbedTransactions,
		error: null,
		isLoading: false,
		list: []
		// list: stubbedIds
	},
	currency: {
		base: 'USD',
		error: null,
		isLoading: false,
		lastUpdated: null,
		rates: {}
		// rates: {
		// 	CNY: '6.7135',
		// 	ETH: '0.0072508429',
		// 	GBP: '0.7514',
		// 	JPY: '111.42557908',
		// 	KRW: '1134.116271',
		// 	SGD: '1.3504'
		// }
	}
};

const ethereumReducer = (state = initialState, action) => {
	switch (action.type) {
	case ETHEREUM.UPDATE_BALANCE_STARTED: {
		console.log('fetching balance...');

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

		console.log(`setting fetched balance: ${balance}`);

		return {
			...state,
			balance: {
				...state.balance,
				isLoading: false,
				value: balance
			}
		};
	}
	case ETHEREUM.UPDATE_BALANCE_ERROR: {
		const { error } = action.payload;

		// TODO: Parse error
		console.log(`error fetching balance: ${error}`);

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
		console.log('clearing balance...');

		return {
			...state,
			balance: {
				...state.balance,
				value: null
			}
		};
	}
	case ETHEREUM.UPDATE_TRANSACTIONS_STARTED: {
		console.log('fetching transactions...');

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

		console.log('setting transactions: ', updatedTransactions);
		console.log('setting transactions list: ', transactionsList);

		return {
			...state,
			transactions: {
				...state.transactions,
				byIds: updatedTransactions,
				isLoading: false,
				list: transactionsList
			}
		};
	}
	case ETHEREUM.UPDATE_TRANSACTIONS_ERROR: {
		const { error } = action.payload;

		// TODO: Parse error
		console.log(`error fetching transactions: ${error}`);

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
		console.log('clearing transactions...');

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
		console.log('fetching currency rates...');

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

		console.log('setting currency rates: ', rates);
		console.log(`setting base currency: ${base}`);
		console.log(`setting currency timestamp: ${timestamp}`);

		return {
			...state,
			currency: {
				...state.currency,
				base,
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

		// TODO: Parse error
		console.log(`error fetching currency rates: ${error}`);

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
