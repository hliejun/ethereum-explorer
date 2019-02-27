import { ETHEREUM } from '../actions/types';

/* Shape of Transaction:
 *  [id]: {
 *		confirmations,
 *		date,
 *		ethAmount,
 *		gasFee,
 *		status,
 *		transactionAddress,
 *		type
 *	}
 */

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
	pagination: {
		error: null,
		isLoading: false,
		lastPage: 0,
		total: 0
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
	case ETHEREUM.PAGINATE_TRANSACTIONS_STARTED: {
		return {
			...state,
			pagination: {
				...state.pagination,
				isLoading: true
			}
		};
	}
	case ETHEREUM.PAGINATE_TRANSACTIONS_SUCCESS: {
		const { transactions, byIds, page, total } = action.payload;
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
				total,
				isLoading: false,
				lastPage: page
			}
		};
	}
	case ETHEREUM.PAGINATE_TRANSACTIONS_ERROR: {
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
	case ETHEREUM.CLEAR_TRANSACTIONS: {
		return {
			...state,
			transactions: {
				...state.transactions,
				byIds: {},
				list: []
			},
			pagination: {
				...state.pagination,
				lastPage: 0,
				total: 0
			}
		};
	}
	default:
		return state;
	}
};

export default ethereumReducer;
