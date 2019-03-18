import { ETHEREUM } from '../actions/types';

import {
	stubbedIds,
	stubbedSummary,
	stubbedTransactions
} from '../../components/scenes/Portfolio/_stubbedValues';

const initialState = {
	balance: {
		error: null,
		isLoading: false,
		// value: null
		value: stubbedSummary.balance
	},
	transactions: {
		// byIds: {},
		byIds: stubbedTransactions,
		error: null,
		isLoading: false,
		// list: []
		list: stubbedIds
	},
	currency: {
		base: 'USD',
		error: null,
		isLoading: false,
		lastUpdated: null,
		// rates: {}
		rates: {
			CNY: 6.7135,
			ETH: 0.0072508429,
			GBP: 0.7514,
			JPY: 111.42557908,
			KRW: 1134.116271,
			SGD: 1.3504
		}
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
		return {
			...state,
			transactions: {
				...state.transactions,
				byIds: {
					...state.transactions.byIds,
					...transactions
				},
				list: Object.keys(transactions)
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
	default:
		return state;
	}
};

export default ethereumReducer;
