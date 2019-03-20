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

		console.log(`setting api key: ${apiKey}`);

		return {
			...state,
			apiKey
		};
	}
	case SETTINGS.SET_CURRENCY: {
		const { currency } = action.payload;

		console.log(`setting currency: ${currency}`);

		return {
			...state,
			currency
		};
	}
	case SETTINGS.TOGGLE_NIGHT_MODE: {
		console.log(`setting night mode: ${!state.nightMode}`);

		return {
			...state,
			nightMode: !state.nightMode
		};
	}
	case SETTINGS.RESET: {
		console.log('resetting settings...');

		return initialState;
	}
	default:
		return state;
	}
};

export default settingsReducer;
