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

// TODO: Debounce call by load state? (should be done in app pages)
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

/* Clear Balance */

const clearBalance = () => ({
	type: ETHEREUM.CLEAR_BALANCE
});

/* Get Transactions */

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

// TODO: Debounce call by load state? (should be done in app pages)
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

/* Clear Transactions */

const clearTransactions = () => ({
	type: ETHEREUM.CLEAR_TRANSACTIONS
});

/* Clean Load Transactions */

// TODO: Debounce call by load state? (should be done in app pages)
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

/* Get Currency Rates */

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

// TODO: Debounce call by load state? (should be done in app pages)
// TODO: Conditionally fetch (based on timestamp)
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
