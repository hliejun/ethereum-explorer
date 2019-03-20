import { SETTINGS } from '../actions/types';

const initialState = {
	apiKey: '',
	currency: null,
	nightMode: false
};

const settingsReducer = (state = initialState, action) => {
	switch (action.type) {
	case SETTINGS.SET_API_KEY: {
		const { apiKey } = action.payload;
		return {
			...state,
			apiKey
		};
	}
	case SETTINGS.SET_CURRENCY: {
		const { currency } = action.payload;
		return {
			...state,
			currency
		};
	}
	case SETTINGS.TOGGLE_NIGHT_MODE: {
		return {
			...state,
			nightMode: !state.nightMode
		};
	}
	case SETTINGS.RESET: {
		return initialState;
	}
	default:
		return state;
	}
};

export default settingsReducer;
