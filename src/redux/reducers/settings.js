import {
	SETTINGS_SET_CURRENCY,
	SETTINGS_TOGGLE_NIGHT_MODE,
	SETTINGS_RESET
} from '../actionTypes';

const initialState = {
	currency: 'SGD', // USD, JPY, SGD, KRW, GBP, CNY
	nightMode: false
};

const settingsReducer = (state = initialState, action) => {
	switch (action.type) {
	case SETTINGS_SET_CURRENCY: {
		const { currency } = action.payload;
		return {
			...state,
			currency
		};
	}
	case SETTINGS_TOGGLE_NIGHT_MODE: {
		const { nightMode } = action.payload;
		return {
			...state,
			nightMode: !!nightMode
		};
	}
	case SETTINGS_RESET: {
		return initialState;
	}
	default:
		return state;
	}
};

export default settingsReducer;
