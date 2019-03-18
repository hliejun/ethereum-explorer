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
	type: ETHEREUM.UPDATE_TRANSACTIONS_STARTED
});

const getTransactionsSuccess = ({ transactions }) => ({
	type: ETHEREUM.UPDATE_TRANSACTIONS_SUCCESS,
	payload: {
		transactions
	}
});

const getTransactionsFailure = error => ({
	type: ETHEREUM.UPDATE_TRANSACTIONS_ERROR,
	payload: {
		error
	}
});

const getTransactions = ({ address, token }) => {
	return dispatch => {
		dispatch(getTransactionsStarted());
		axios
			.post('https://jsonplaceholder.typicode.com/transactions', {
				address,
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

const reloadTransactions = ({ token, address }) => {
	return dispatch => {
		dispatch(getTransactionsStarted());
		axios
			.post('https://jsonplaceholder.typicode.com/transactions', {
				address,
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

export {
	clearBalance,
	clearTransactions,
	getBalance,
	getTransactions,
	reloadTransactions
};
