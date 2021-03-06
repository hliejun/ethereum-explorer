import axios from 'axios';

import { ETHEREUM } from './types';

// Sync actions

const clearBalance = () => ({
	type: ETHEREUM.CLEAR_BALANCE
});

const clearTransactions = () => ({
	type: ETHEREUM.CLEAR_TRANSACTIONS
});

// Fetch ethereum account balance

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

const getBalance = (token, address) => {
	return dispatch => {
		dispatch(getBalanceStarted());
		axios
			.post(
				`${process.env.API_URL}/balance`,
				{ address },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
				}
			)
			.then(response => {
				dispatch(getBalanceSuccess(response.data));
			})
			.catch(error => {
				dispatch(getBalanceFailure(error.message));
			});
	};
};

// Fetch transactions history

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

const getTransactions = (token, address) => {
	return dispatch => {
		dispatch(getTransactionsStarted());
		axios
			.post(
				`${process.env.API_URL}/transactions`,
				{ address },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
				}
			)
			.then(response => {
				dispatch(getTransactionsSuccess(response.data));
			})
			.catch(error => {
				dispatch(getTransactionsFailure(error.message));
			});
	};
};

const reloadTransactions = (token, address) => {
	return dispatch => {
		dispatch(getTransactionsStarted());
		axios
			.post(
				`${process.env.API_URL}/transactions`,
				{ address },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
				}
			)
			.then(response => {
				dispatch(clearTransactions());
				dispatch(getTransactionsSuccess(response.data));
			})
			.catch(error => {
				dispatch(getTransactionsFailure(error.message));
			});
	};
};

// Fetch currency rates

const getCurrencyRatesStarted = () => ({
	type: ETHEREUM.UPDATE_CURRENCY_RATES_STARTED
});

const getCurrencyRatesSuccess = ({ base, rates, timestamp }) => ({
	type: ETHEREUM.UPDATE_CURRENCY_RATES_SUCCESS,
	payload: {
		base,
		rates,
		timestamp
	}
});

const getCurrencyRatesFailure = error => ({
	type: ETHEREUM.UPDATE_CURRENCY_RATES_ERROR,
	payload: {
		error
	}
});

const getCurrencyRates = (token, symbols) => {
	return dispatch => {
		dispatch(getCurrencyRatesStarted());
		axios
			.post(
				`${process.env.API_URL}/rates`,
				{ symbols },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
				}
			)
			.then(response => {
				dispatch(getCurrencyRatesSuccess(response.data));
			})
			.catch(error => {
				dispatch(getCurrencyRatesFailure(error.message));
			});
	};
};

export {
	clearBalance,
	clearTransactions,
	getBalance,
	getCurrencyRates,
	getTransactions,
	reloadTransactions
};
