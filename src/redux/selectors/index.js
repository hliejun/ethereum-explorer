import { createSelector } from 'reselect';
import qs from 'query-string';

import { filter, sort, untrim } from './helper';

import {
	CURRENCY_DEFAULT,
	FORM_VALIDATION,
	VIEWER_PAGE_SIZE
} from '../../constants';

// Props data

const getQuery = (_, props) => props.location;

const getId = (_, props) => props.match.params.id;

// Auth data

export const getAuthToken = ({ authReducer }) => authReducer.sessionAuth;

export const getAuthLastUpdated = ({ authReducer }) => authReducer.lastUpdated;

// Settings data

export const getApiKey = ({ settingsReducer }) => settingsReducer.apiKey;

export const getCode = ({ settingsReducer }) =>
	settingsReducer.currency || CURRENCY_DEFAULT;

export const getTheme = ({ settingsReducer }) => settingsReducer.nightMode;

// User data

export const getAddress = ({ userReducer }) => userReducer.ethAccount.address;

// Ethereum data

const getBaseCode = ({ ethereumReducer }) => ethereumReducer.currency.base;

const getCurrencyRates = ({ ethereumReducer }) =>
	ethereumReducer.currency.rates;

const getTransactionIds = ({ ethereumReducer }) =>
	ethereumReducer.transactions.list;

export const getBalance = ({ ethereumReducer }) => {
	const balance = parseFloat(ethereumReducer.balance.value);
	return Number.isNaN(balance) ? null : balance;
};

export const getTransactions = ({ ethereumReducer }) =>
	ethereumReducer.transactions.byIds;

export const getHistoricalSummary = createSelector(
	[getTransactions],
	transactions => {
		let received = 0;
		let sent = 0;
		Object.values(transactions).forEach(({ source, status, value }) => {
			if (status === 'failed' || status === 'pending') {
				// don't count if it's not a successful transaction
			} else if (source.type === 'outgoing') {
				sent += parseFloat(value);
			} else {
				received += parseFloat(value);
			}
		});
		const subtotal = received - sent;
		return { received, sent, subtotal };
	}
);

export const getPagination = createSelector(
	[getTransactionIds, getTransactions, getQuery],
	(list, items, query) => {
		const { page, ...formData } = untrim(
			qs.parse(query.search),
			FORM_VALIDATION
		);
		const {
			filter: filterField,
			order: sortOrder,
			sort: sortField,
			...filters
		} = formData;
		const filteredIds = filter(list, items, filterField, filters);
		const sortedIds = sort(filteredIds, items, sortField, sortOrder);
		let index;
		const result = [];
		for (index = 0; index < sortedIds.length; index += VIEWER_PAGE_SIZE) {
			const pageTransactionIds = sortedIds.slice(
				index,
				index + VIEWER_PAGE_SIZE
			);
			result.push(pageTransactionIds);
		}
		return result;
	}
);

export const getRates = createSelector(
	[getCurrencyRates, getBaseCode],
	(rates, baseCode) => {
		const convertedRates = {};
		if (!rates || !rates.ETH) {
			return convertedRates;
		}
		const ethRate = parseFloat(rates.ETH);
		const baseRate =
      Number.isNaN(ethRate) || ethRate === 0 ? null : 1 / ethRate;
		if (!baseRate) {
			return convertedRates;
		}
		Object.keys(rates).forEach(key => {
			convertedRates[key] = parseFloat(rates[key]) * baseRate;
		});
		convertedRates[baseCode] = baseRate;
		return convertedRates;
	}
);

export const getSimpleTransactions = createSelector(
	[getTransactions],
	transactions => {
		const simpleTransactions = {};
		Object.keys(transactions).forEach(key => {
			const { block, gas, ...mandatoryProps } = transactions[key];
			simpleTransactions[key] = mandatoryProps;
		});
		return simpleTransactions;
	}
);

export const getTransaction = createSelector(
	[getTransactions, getId],
	(transactions, id) => (transactions[id] ? { id, ...transactions[id] } : null)
);

// Composite selectors

export const getErrorStates = ({ authReducer, ethereumReducer }) => ({
	auth: authReducer.error,
	balance: ethereumReducer.balance.error,
	currency: ethereumReducer.currency.error,
	transactions: ethereumReducer.transactions.error
});

export const getLoadStates = ({ authReducer, ethereumReducer }) => ({
	auth: authReducer.isLoading,
	balance: ethereumReducer.balance.isLoading,
	currency: ethereumReducer.currency.isLoading,
	transactions: ethereumReducer.transactions.isLoading
});

export const getLocalisation = createSelector(
	[getCode, getRates],
	(code, rates) => {
		if (!rates || !rates[code]) {
			return { code };
		}
		return { code, rate: rates[code] };
	}
);
