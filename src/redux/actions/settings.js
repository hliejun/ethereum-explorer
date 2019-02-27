import { SETTINGS } from './types';

/* Currency */

const currencyAction = currency => ({
	type: SETTINGS.SET_CURRENCY,
	payload: { currency }
});

const setCurrency = ({ currency }) => {
	return dispatch => {
		dispatch(currencyAction(currency));
	};
};

/* Night Mode */

const nightModeAction = () => ({
	type: SETTINGS.TOGGLE_NIGHT_MODE
});

const toggleNightMode = () => {
	return dispatch => {
		dispatch(nightModeAction());
	};
};

/* Reset Settings */

const resetAction = () => ({
	type: SETTINGS.RESET
});

const reset = () => {
	return dispatch => {
		dispatch(resetAction());
	};
};

export default { reset, setCurrency, toggleNightMode };
