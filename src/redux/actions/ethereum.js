import axios from 'axios';

import { ETHEREUM } from './types';

/* Get Account Balance */

const getBalanceStarted = () => ({
	type: ETHEREUM.UPDATE_BALANCE_STARTED
});

const getBalanceSuccess = ({ balance }) => ({
	type: ETHEREUM.UPDATE_BALANCE_SUCCESS,
	payload: {
		balance
	}
});

const getBalanceFailure = error => ({
	type: ETHEREUM.UPDATE_BALANCE_ERROR,
	payload: {
		error
	}
});

const getBalance = ({ token, address }) => {
	return dispatch => {
		dispatch(getBalanceStarted());
		// TODO: Encrypt ethAddress (end-to-end incl. storage)
		axios
			.post('https://jsonplaceholder.typicode.com/balance', {
				address,
				token
			})
			.then(response => {
				dispatch(getBalanceSuccess(response.data));
			})
			.catch(error => {
				dispatch(getBalanceFailure(error.message));
			});
	};
};

/* Clear Balance */

const clearBalanceAction = () => ({
	type: ETHEREUM.CLEAR_BALANCE
});

const clearBalance = () => {
	return dispatch => {
		dispatch(clearBalanceAction());
	};
};

/* Get Paginated Transactions */

const getTransactionsStarted = () => ({
	type: ETHEREUM.PAGINATE_TRANSACTIONS_STARTED
});

const getTransactionsSuccess = ({ byIds, page, total, transactions }) => ({
	type: ETHEREUM.PAGINATE_TRANSACTIONS_SUCCESS,
	payload: {
		byIds,
		page,
		total,
		transactions
	}
});

const getTransactionsFailure = error => ({
	type: ETHEREUM.PAGINATE_TRANSACTIONS_ERROR,
	payload: {
		error
	}
});

const getTransactions = ({
	address,
	filter,
	page,
	sortBy,
	sortOrder,
	token
}) => {
	return dispatch => {
		dispatch(getTransactionsStarted());
		// TODO: Encrypt ethAddress (end-to-end incl. storage)
		axios
			.post('https://jsonplaceholder.typicode.com/transactions', {
				address,
				filter,
				page,
				sortBy,
				sortOrder,
				token
			})
			.then(response => {
				dispatch(getTransactionsSuccess(response.data));
			})
			.catch(error => {
				dispatch(getTransactionsFailure(error.message));
			});
	};
};

/* Clear Transactions */

const clearTransactionsAction = () => ({
	type: ETHEREUM.CLEAR_TRANSACTIONS
});

const clearTransactions = () => {
	return dispatch => {
		dispatch(clearTransactionsAction());
	};
};

/* Clean Load Transactions */

const reloadTransactions = ({ token, address, filter, sortBy, sortOrder }) => {
	return dispatch => {
		dispatch(getTransactionsStarted());
		// TODO: Encrypt ethAddress (end-to-end incl. storage)
		axios
			.post('https://jsonplaceholder.typicode.com/transactions', {
				address,
				filter,
				page: 1,
				sortBy,
				sortOrder,
				token
			})
			.then(response => {
				dispatch(clearTransactionsAction());
				dispatch(getTransactionsSuccess(response.data));
			})
			.catch(error => {
				dispatch(getTransactionsFailure(error.message));
			});
	};
};

export default {
	clearBalance,
	clearTransactions,
	getBalance,
	getTransactions,
	reloadTransactions
};
