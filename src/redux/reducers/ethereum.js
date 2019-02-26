import {
	ETHEREUM_UPDATE_BALANCE_STARTED,
	ETHEREUM_UPDATE_BALANCE_SUCCESS,
	ETHEREUM_UPDATE_BALANCE_ERROR,
	ETHEREUM_CLEAR_BALANCE,
	ETHEREUM_UPDATE_TRANSACTIONS_STARTED,
	ETHEREUM_UPDATE_TRANSACTIONS_SUCCESS,
	ETHEREUM_UPDATE_TRANSACTIONS_ERROR,
	ETHEREUM_PAGINATE_TRANSACTIONS_STARTED,
	ETHEREUM_PAGINATE_TRANSACTIONS_SUCCESS,
	ETHEREUM_PAGINATE_TRANSACTIONS_ERROR,
	ETHEREUM_CLEAR_TRANSACTIONS
} from '../actionTypes';

/* Shape of Transaction:
 *  [id]: {
 *		type,
 *		status,
 *		date,
 *		confirmations,
 *		transactionAddress,
 *		ethAmount,
 *		gasFee
 *	}
 */

const initialState = {
	balance: {
		value: null,
		isLoading: false,
		error: null
	},
	transactions: {
		list: [],
		byIds: {},
		isLoading: false,
		error: null
	},
	pagination: {
		isLoading: false,
		lastPage: 0,
		error: null
	}
};

const ethereumReducer = (state = initialState, action) => {
	switch (action.type) {
	case ETHEREUM_UPDATE_BALANCE_STARTED: {
		return {
			...state,
			balance: {
				...state.balance,
				isLoading: true
			}
		};
	}
	case ETHEREUM_UPDATE_BALANCE_SUCCESS: {
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
	case ETHEREUM_UPDATE_BALANCE_ERROR: {
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
	case ETHEREUM_CLEAR_BALANCE: {
		return {
			...state,
			balance: {
				...state.balance,
				value: null
			}
		};
	}
	case ETHEREUM_UPDATE_TRANSACTIONS_STARTED: {
		return {
			...state,
			transactions: {
				...state.transactions,
				isLoading: true
			}
		};
	}
	case ETHEREUM_UPDATE_TRANSACTIONS_SUCCESS: {
		const { transactions } = action.payload;
		return {
			...state,
			transactions: {
				...state.transactions,
				isLoading: false,
				list: transactions
			}
		};
	}
	case ETHEREUM_UPDATE_TRANSACTIONS_ERROR: {
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
	case ETHEREUM_PAGINATE_TRANSACTIONS_STARTED: {
		return {
			...state,
			pagination: {
				...state.pagination,
				isLoading: true
			}
		};
	}
	case ETHEREUM_PAGINATE_TRANSACTIONS_SUCCESS: {
		const { transactions, byIds, page } = action.payload;
		return {
			...state,
			transactions: {
				...state.transactions,
				byIds: {
					...state.transactions.byIds,
					...byIds
				},
				list: [...state.transactions.list, ...transactions]
			},
			pagination: {
				...state.pagination,
				isLoading: false,
				lastPage: page
			}
		};
	}
	case ETHEREUM_PAGINATE_TRANSACTIONS_ERROR: {
		const { error } = action.payload;
		return {
			...state,
			pagination: {
				...state.pagination,
				error,
				isLoading: false
			}
		};
	}
	case ETHEREUM_CLEAR_TRANSACTIONS: {
		return {
			...state,
			transactions: {
				...state.transactions,
				byIds: {},
				list: []
			},
			pagination: {
				...state.pagination,
				lastPage: 0
			}
		};
	}
	default:
		return state;
	}
};

export default ethereumReducer;
